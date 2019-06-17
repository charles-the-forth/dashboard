import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import Typography from '@material-ui/core/Typography';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Temperature</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip/>
                <YAxis>
                    <Label value="[°C]" offset={-20} angle={-90} position="left" />
                </YAxis>
                <Area name='BME280' type='monotone' dataKey='temperatureExternal' stroke='#e65100' fill='#f57c00' strokeWidth={5} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default TemperatureChart;
