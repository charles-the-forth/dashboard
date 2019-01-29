import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import './PressureChart.css';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const PressureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Tlak [hPa]</h2>
        <AreaChart width={850} height={350} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='value' stroke='#1976D2' fill='#03A9F4' />
        </AreaChart>
    </div>
);

export default PressureChart;
