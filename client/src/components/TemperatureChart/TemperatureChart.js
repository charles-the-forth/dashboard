import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';

const TemperatureChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Temperature</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis>
                    <Label value="°C" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='CanSat' type='monotone' dataKey='temperatureCanSat' stroke='#FFA000' fill='#FFC107' />
                <Area name='External' type='monotone' dataKey='temperatureExternal' stroke='#dd2c00' fill='#ff7043' />
                <Area name='MPU' type='monotone' dataKey='temperatureMPU' stroke='#ff3d00' fill='#ffccbc' />
                <Area name='SCD30' type='monotone' dataKey='tempSCD30' stroke='#ff6f00' fill='#ffca28' />
                <Area name='Ambient' type='monotone' dataKey='ambientTemp' stroke='#827717' fill='#aeea00' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default TemperatureChart;
