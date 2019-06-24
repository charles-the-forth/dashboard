import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Altitude</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis>
                    <Label value="m" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area type='monotone' name="CanSat" dataKey='altitudeCanSat' stroke='#087F23' fill='#4CAF50' />
                <Area type='monotone' name="External" dataKey='altitudeExternal' stroke='#087F23' fill='#4CAF50' />
                <Legend verticalAlign="bottom" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AltitudeChart;
