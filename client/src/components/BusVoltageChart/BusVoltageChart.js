import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const BusVoltageChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Bus voltage [V]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='Bus voltage' type='monotone' dataKey='busVoltage' stroke='#ffa000' fill='#ffca28' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default BusVoltageChart;
