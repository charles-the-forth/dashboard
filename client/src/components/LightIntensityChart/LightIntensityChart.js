import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Label } from 'recharts';
import Typography from '@material-ui/core/Typography';

const LightIntensityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Light intensity</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 5, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis tickFormatter={it => (it / 1000) + 'k'}>
                    <Label value="[lux]" offset={-12} angle={-90} position="left" />
                </YAxis>
                <Area name='BH1750' type='monotone' dataKey='lightIntensity' stroke='#C79100' fill='#FFF350' strokeWidth={5} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default LightIntensityChart;
