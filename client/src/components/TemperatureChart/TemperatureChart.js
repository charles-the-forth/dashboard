import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { takeLast } from 'ramda';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='CanSat' type='monotone' dataKey='temperatureCanSat' stroke='#FFA000' fill='#FFC107' />
                <Area name='External' type='monotone' dataKey='temperatureExternal' stroke='#FFC107' fill='#FFA000' />
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default TemperatureChart;
