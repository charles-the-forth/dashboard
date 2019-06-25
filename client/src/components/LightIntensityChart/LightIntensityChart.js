import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';

const LightIntensityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Light intensity</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis tickFormatter={tick => Math.round(tick / 1000) + 'k'}>
                    <Label value="lux" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='BH1750' type='monotone' dataKey='lightIntensity' stroke='#C79100' fill='#FFF350' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default LightIntensityChart;
