import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';

const CO2ConcentrationChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>CO2 concentration</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis>
                    <Label value="%" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='SCD30' type='monotone' dataKey='SCD30' stroke='#000063' fill='#6746C3' />
                <Area name='CCS811' type='monotone' dataKey='CCS811' stroke='#000063' fill='#6746C3' />
                <Legend verticalAlign="bottom" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
); 

export default CO2ConcentrationChart;
