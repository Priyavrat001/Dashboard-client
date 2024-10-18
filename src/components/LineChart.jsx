import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    LineElement,
    PointElement,   // Import PointElement
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import 'chartjs-adapter-moment';  // Use the appropriate date adapter

// Register the components, including PointElement
ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    LineElement,
    PointElement,   // Register PointElement here
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ data, feature }) => {
    if (!data || !feature) {
        return <p>No data available for this feature</p>;
    }

    const labels = data.map(item => new Date(item.Day));
    const values = data.map(item => parseInt(item[feature], 10));

    const chartData = {
        labels,
        datasets: [
            {
                label: `Time Trend of ${feature}`,
                data: values,
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'rgba(75, 192, 192, 1)',
                hoverBackgroundColor: 'lightcoral',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
