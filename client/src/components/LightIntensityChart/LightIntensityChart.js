import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';

const LightIntensityChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Intenzita světla [lux]</h2>
        <AreaChart width={360} height={254} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Area name='BH1750' type='monotone' dataKey='lightIntensity' stroke='#C79100' fill='#FFF350' />
        </AreaChart>
    </div>
);

export default LightIntensityChart;
