import React from 'react';
import { LineChart, Legend, YAxis, CartesianGrid, Line } from 'recharts';
import { takeLast } from 'ramda';

const RotationChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Náklon [°]</h2>
        <LineChart width={450} height={280} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Line name="osa X" type="monotone" dataKey="x" stroke="#F44336" />
            <Line name="osa Y" type="monotone" dataKey="y" stroke="#4CAF50" />
            <Line name="osa Z" type="monotone" dataKey="z" stroke="#2196F3" />
        </LineChart>
    </div>
);

export default RotationChart;
