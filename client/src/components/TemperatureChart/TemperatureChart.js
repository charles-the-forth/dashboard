import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, Legend } from 'recharts';
import { takeLast } from 'ramda';
import './TemperatureChart.css';

const TemperatureChart = ({ config, data, redirect }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <AreaChart width={650} height={350} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Area name='BME externí' type='monotone' dataKey='temperatureExternal' stroke='#FF5722' fill='#E64A19' />
            <Area name='BME interní' type='monotone' dataKey='temperatureCanSat' stroke='#FF5722' fill='#E64AFF' />
            <Area name='MPU' type='monotone' dataKey='temperatureMPU' stroke='#E64A19' fill='#FF5722' />
        </AreaChart>
    </div>
);

export default TemperatureChart;
