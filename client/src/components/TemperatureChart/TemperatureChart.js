import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <AreaChart width={450} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Area name='Teplota' type='monotone' dataKey='temperature' stroke='#087F23' fill='#4CAF50' />
        </AreaChart>
    </div>
);

export default TemperatureChart;
