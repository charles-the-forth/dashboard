import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Vlkost vzduchu [%]</h2>
        <AreaChart width={450} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Area name='Vlhkost vzduchu' type='monotone' dataKey='humidity' stroke='#000063' fill='#6746C3' />
        </AreaChart>
    </div>
);

export default HumidityChart;
