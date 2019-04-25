import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Teplota [°C]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='Teplota CanSat' type='monotone' dataKey='temperatureCanSat' stroke='#e65100' fill='#f57c00' />
                <Area name='Teplota BME280' type='monotone' dataKey='temperatureExternal' stroke='#b71c1c' fill='#d32f2f' />
                <Area name='Teplota MPU' type='monotone' dataKey='temperatureMPU' stroke='#880e4f' fill='#c2185b' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default TemperatureChart;
