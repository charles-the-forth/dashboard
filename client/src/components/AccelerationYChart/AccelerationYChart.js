import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const AccelerationYChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Zrychlení v ose y [m/s]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name="Zrychlení v ose y [m/s]" type='monotone' dataKey='accelerationY' stroke='#1b5e20' fill='#4caf50' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AccelerationYChart;
