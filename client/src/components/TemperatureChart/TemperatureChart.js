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
                <Area name='Teplota' type='monotone' dataKey='temperature' stroke='#FFA000' fill='#FFC107' />
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default TemperatureChart;
