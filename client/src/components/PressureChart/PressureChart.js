import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const PressureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Tlak [hPa]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='Tlak' type='monotone' dataKey='pressure' stroke='#000063' fill='#6746C3' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default PressureChart;
