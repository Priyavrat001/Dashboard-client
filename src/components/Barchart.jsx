// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the components you need
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data, onBarClick }) => {
    // Aggregating data for the bar chart by feature
    const aggregatedData = data.reduce((acc, item) => {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach((feature) => {
            acc[feature] = (acc[feature] || 0) + parseInt(item[feature]);
        });
        return acc;
    }, {});

    const chartData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                label: 'Total Time Spent',
                data: Object.values(aggregatedData), // Aggregated data for each feature
                backgroundColor: 'blue',  // Default bar color
                hoverBackgroundColor: 'lightcoral',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                const clickedFeature = chartData.labels[clickedIndex];
                onBarClick(clickedFeature); // Pass the clicked feature to the parent component
            }
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;


