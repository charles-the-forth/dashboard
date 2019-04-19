import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import VerticalChartTick from '../VerticalChartTick/VerticalChartTick';

const LightIntensityChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Intenzita světla [lux]</h2>
        <AreaChart width={320} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={<VerticalChartTick/>}/>
            <YAxis />
            <Area name='BH1750' type='monotone' dataKey='value' stroke='#C79100' fill='#FFF350' />
        </AreaChart>
    </div>
);

export default LightIntensityChart;
