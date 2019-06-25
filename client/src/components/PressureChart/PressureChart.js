import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend, Label } from 'recharts';
import { takeLast } from 'ramda';

const PressureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Pressure</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis>
                    <Label value="hPa" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='External' type='monotone' dataKey='pressureExternal' stroke='#000063' fill='#6746C3' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default PressureChart;
