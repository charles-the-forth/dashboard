import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Typography from '@material-ui/core/Typography';

const LoadVoltageChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Load voltage [V]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='Load voltage' type='monotone' dataKey='loadVoltage' stroke='#00695c' fill='#26a69a' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default LoadVoltageChart;
