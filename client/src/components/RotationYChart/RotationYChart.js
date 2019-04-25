import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const RotationYChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Natočení v ose y [°]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name="Natočení v ose y [°]" type='monotone' dataKey='rotationY' stroke='#9e9d24' fill='#d4e157' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default RotationYChart;
