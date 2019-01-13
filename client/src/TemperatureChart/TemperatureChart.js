import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import './TemperatureChart.css';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Teplota [°C]</h2>
        <AreaChart width={850} height={350} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }} className="chart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='value' stroke='#FF5722' fill='#E64A19' />
        </AreaChart>
    </div>
);

export default TemperatureChart;
