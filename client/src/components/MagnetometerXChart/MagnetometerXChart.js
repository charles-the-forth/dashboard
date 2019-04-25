import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const MagnetometerXChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Natočení k mag. pólu v ose x [°]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name="Natočení k mag. pólu v ose x [°]" type='monotone' dataKey='magnetometerX' stroke='#0277bd' fill='#29b6f6' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default MagnetometerXChart;
