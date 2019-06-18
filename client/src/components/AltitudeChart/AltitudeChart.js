import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Altitude</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area type='monotone' dataKey='altitudeCanSat' stroke='#087F23' fill='#4CAF50' />
                <Area type='monotone' dataKey='altitudeExternal' stroke='#087F23' fill='#4CAF50' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AltitudeChart;
