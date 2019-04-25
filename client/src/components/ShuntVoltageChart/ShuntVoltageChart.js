import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const ShuntVoltageChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Shunt voltage [mV]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name='Shunt voltage' type='monotone' dataKey='shuntVoltage' stroke='#689f38' fill='#9ccc65' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default ShuntVoltageChart;
