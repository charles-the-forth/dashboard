import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const MagnetometerYChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Natočení k mag. pólu v ose y [°]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name="Natočení k mag. pólu v ose y [°]" type='monotone' dataKey='magnetometerY' stroke='#004d40' fill='#009688' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default MagnetometerYChart;
