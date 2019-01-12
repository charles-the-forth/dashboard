import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import './TemperatureChart.css';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <AreaChart width={900} height={400} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='value' stroke='#FF5722' fill='#E64A19' />
        </AreaChart>
    </div>
);

export default TemperatureChart;
