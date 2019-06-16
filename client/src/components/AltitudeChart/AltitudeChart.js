import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Altitude [m]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name="External" type='monotone' dataKey='altitudeExternal' stroke='#e64a19' fill='#ff5722' />
                <Area name="CanSat" type='monotone' dataKey='altitudeCanSat' stroke='#087F23' fill='#4CAF50' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AltitudeChart;
