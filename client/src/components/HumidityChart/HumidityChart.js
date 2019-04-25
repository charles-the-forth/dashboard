import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { takeLast } from 'ramda';
import Typography from '@material-ui/core/Typography';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Vlhkost vzduchu [%]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 100]}/>
                <Area name='Vlhkost vzduchu CanSat' type='monotone' dataKey='humidityCanSat' stroke='#007AC1' fill='#67DAFF' />
                <Area name='Vlhkost vzduchu Externí' type='monotone' dataKey='humidityExternal' stroke='#ff8f00' fill='#ffc107' />
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default HumidityChart;
