import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangePicker from '../components/DateReangePicker';
import BarChart from '../components/Barchart';
import LineChart from '../components/LineChart';
import Cookies from 'js-cookie';
import { key } from '../config/server';
import { toast } from 'react-hot-toast';
import { MdLogout } from "react-icons/md";
import { logoutUser } from '../api/logout';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null); // Start with null for no filter
    const [endDate, setEndDate] = useState(null); // Start with null for no filter
    const [ageGroup, setAgeGroup] = useState('');
    const [gender, setGender] = useState('');
    const [selectedFeature, setSelectedFeature] = useState('');

    const navigate = useNavigate();

    // Load preferences from cookies on component mount
    useEffect(() => {
        const savedAgeGroup = Cookies.get('ageGroup');
        const savedGender = Cookies.get('gender');
        const savedStartDate = Cookies.get('startDate');
        const savedEndDate = Cookies.get('endDate');

        if (savedAgeGroup) setAgeGroup(savedAgeGroup);
        if (savedGender) setGender(savedGender);
        if (savedStartDate) setStartDate(new Date(savedStartDate));
        if (savedEndDate) setEndDate(new Date(savedEndDate));

        fetchData();
    }, []);

    useEffect(() => {
        filterData();

        // Save preferences to cookies whenever filters change
        Cookies.set('ageGroup', ageGroup);
        Cookies.set('gender', gender);
        if (startDate) Cookies.set('startDate', startDate.toISOString());
        if (endDate) Cookies.set('endDate', endDate.toISOString());
    }, [ageGroup, gender, startDate, endDate, data]);

    const fetchData = async () => {
        const response = await axios.get(`${key}/api/v1/data`, {
            withCredentials: true
        });

        const data = response.data;

        setData(data.filteredData);
        setFilteredData(data.filteredData); // Initially show all data
    };

    const filterData = () => {
        let filtered = data;

        // Filter by age group
        if (ageGroup) {
            filtered = filtered.filter(item => item.Age === ageGroup);
        }

        // Filter by gender
        if (gender) {
            filtered = filtered.filter(item => item.Gender === gender);
        }

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(item => {
                const [day, month, year] = item.Day.split('/'); // Split dd/mm/yyyy format
                const itemDate = new Date(`${year}-${month}-${day}`); // Convert to yyyy-mm-dd format

                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        setFilteredData(filtered);
    };

    const handleBarClick = (feature) => {
        console.log("clicked on barchart" + feature)
        setSelectedFeature(feature); // Set the clicked feature for the line chart
    };

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        filterData(); // Trigger filtering
    };

    const resetPreferences = () => {
        setAgeGroup('');
        setGender('');
        setStartDate(null);
        setEndDate(null);

        // Clear cookies
        Cookies.remove('ageGroup');
        Cookies.remove('gender');
        Cookies.remove('startDate');
        Cookies.remove('endDate');

        filterData();
    };

    const handleLogout = () => {
        logoutUser();
        return navigate("/login")
    }
    // for sharing links to onother user
    const generateShareableLink = () => {
        const params = new URLSearchParams({
            ageGroup,
            gender,
            startDate: startDate ? startDate.toISOString() : '',
            endDate: endDate ? endDate.toISOString() : ''
        });

        const shareableLink = `${window.location.origin}/?${params.toString()}`;
        navigator.clipboard.writeText(shareableLink);
        toast.success("Link copied to clipboard!");
    };

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        const ageGroupParam = queryParams.get('ageGroup');
        const genderParam = queryParams.get('gender');
        const startDateParam = queryParams.get('startDate');
        const endDateParam = queryParams.get('endDate');

        if (ageGroupParam) setAgeGroup(ageGroupParam);
        if (genderParam) setGender(genderParam);
        if (startDateParam) setStartDate(new Date(startDateParam));
        if (endDateParam) setEndDate(new Date(endDateParam));



        fetchData();
    }, [window.location.search]);


    return (
        <>
            <div className='resetButtonContainer'>
                <h1>Product Analytics Dashboard</h1>
                <button onClick={resetPreferences}>Reset Filters</button>
                <div className="logoutbutton">
                    <MdLogout onClick={handleLogout} />
                </div>
            </div>
            <hr />
            <div className="dashboard-container">
                {/* Sidebar for Filters */}
                <div className="filter-container">
                    <DateRangePicker onDateChange={handleDateChange} />
                    <div className="filters">
                        <label>
                            Age Group:
                            <select value={ageGroup} onChange={e => setAgeGroup(e.target.value)}>
                                <option value="">All</option>
                                <option value="15-25">15-25</option>
                                <option value=">25">25</option>
                            </select>
                        </label>
                        <label>
                            Gender:
                            <select value={gender} onChange={e => setGender(e.target.value)}>
                                <option value="">All</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>

                    </div>
                </div>

                {/* Main content for Charts */}
                <div className="chart-container">
                    <div className='bar-chart-container'>
                        <BarChart data={filteredData} onBarClick={handleBarClick} />
                    </div>

                    {selectedFeature && (
                        <div className="line-chart-container">
                            <LineChart data={filteredData} feature={selectedFeature} />
                        </div>
                    )}
                </div>
            </div>
            <button onClick={generateShareableLink} className='sharechartData'>Share Chart</button>
        </>
    );
};

export default Dashboard;
