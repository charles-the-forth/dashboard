import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Temperature [°C]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <YAxis />
                <Area name='CanSat' type='monotone' dataKey='temperatureCanSat' stroke='#e65100' fill='#f57c00' />
                <Area name='BME280' type='monotone' dataKey='temperatureExternal' stroke='#b71c1c' fill='#d32f2f' />
                <Area name='MPU' type='monotone' dataKey='temperatureMPU' stroke='#880e4f' fill='#c2185b' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default TemperatureChart;
