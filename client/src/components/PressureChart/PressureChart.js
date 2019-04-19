import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';

const PressureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Tlak [hPa]</h2>
        <AreaChart width={500} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Area name='Tlak' type='monotone' dataKey='pressure' stroke='#000063' fill='#6746C3' />
        </AreaChart>
    </div>
);

export default PressureChart;
