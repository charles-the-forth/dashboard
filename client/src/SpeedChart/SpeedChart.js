import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import './SpeedChart.css';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const SpeedChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Rychlost [m/s]</h2>
        <AreaChart width={450} height={350} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='value' stroke='#388E3C' fill='#4CAF50' />
        </AreaChart>
    </div>
);

export default SpeedChart;
