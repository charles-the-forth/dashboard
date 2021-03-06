import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Humidity</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 100]}>
                    <Label value="%" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='External' type='monotone' dataKey='humidityExternal' stroke='#007AC1' fill='#67DAFF' />
                <Area name='SCD30' type='monotone' dataKey='humiditySCD30' stroke='#004d40' fill='#4db6ac' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default HumidityChart;
