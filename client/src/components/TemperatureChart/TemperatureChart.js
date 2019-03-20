import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, Legend } from 'recharts';
import { takeLast } from 'ramda';
import './TemperatureChart.css';

const TemperatureChart = ({ config, data, redirect }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <AreaChart width={450} height={300} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Area name='BME interní' type='monotone' dataKey='temperatureCanSat' stroke='#087F23' fill='#4CAF50' />
            <Area name='BME externí' type='monotone' dataKey='temperatureExternal' stroke='#C41C00' fill='#FF5722' />
            <Area name='MPU' type='monotone' dataKey='temperatureMPU' stroke='#007AC1' fill='#67DAFF' />
        </AreaChart>
    </div>
);

export default TemperatureChart;
