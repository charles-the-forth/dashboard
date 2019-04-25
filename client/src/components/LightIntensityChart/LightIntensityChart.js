import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const LightIntensityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Intenzita světla [lux]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                <Area name='BH1750' type='monotone' dataKey='lightIntensity' stroke='#C79100' fill='#FFF350' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default LightIntensityChart;
