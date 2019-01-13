import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import './HeightChart.css';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const HeightChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Výška [m]</h2>
        <AreaChart width={450} height={400} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='value' stroke='#FFA000' fill='#FFC107' />
        </AreaChart>
    </div>
);

export default HeightChart;