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
                <Area name='Teplota interní' type='monotone' dataKey='temperatureCanSat' stroke='#FFA000' fill='#FFC107' />
                <Area name='Teplota BME280' type='monotone' dataKey='temperatureExternal' stroke='#FFA000' fill='#FFC107' />
                <Area name='Teplota MPU' type='monotone' dataKey='temperatureMPU' stroke='#FFAAA0' fill='#FFC107' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default TemperatureChart;
