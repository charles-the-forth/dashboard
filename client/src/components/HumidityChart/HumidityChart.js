import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Vlkost vzduchu [%]</h2>
        <AreaChart width={360} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Area name='Vlhkost vzduchu' type='monotone' dataKey='humidity' stroke='#007AC1' fill='#67DAFF' />
        </AreaChart>
    </div>
);

export default HumidityChart;
