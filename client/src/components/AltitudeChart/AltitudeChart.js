import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Altitude [m]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area type='monotone' dataKey='altitude' stroke='#087F23' fill='#4CAF50' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AltitudeChart;
