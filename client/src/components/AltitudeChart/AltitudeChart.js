import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Nadmořská výška [m]</h2>
        <AreaChart width={320} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Area type='monotone' dataKey='value' stroke='#FFA000' fill='#FFC107' />
        </AreaChart>
    </div>
);

export default AltitudeChart;
