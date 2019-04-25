import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import Typography from '@material-ui/core/Typography';

const MagnetometerZChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Natočení k mag. pólu v ose z [°]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name="Natočení k mag. pólu v ose z [°]" type='monotone' dataKey='magnetometerZ' stroke='#d81b60' fill='#f48fb1' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default MagnetometerZChart;
