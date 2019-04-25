import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import Typography from '@material-ui/core/Typography';

const AccelerationXChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Zrychlení v ose x [m/s]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name="Zrychlení v ose x [m/s]" type='monotone' dataKey='accelerationX' stroke='#039be5' fill='#4fc3f7' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AccelerationXChart;
