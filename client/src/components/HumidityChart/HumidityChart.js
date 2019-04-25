import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Vlhkost vzduchu [%]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis domain={[0, 100]}/>
                <Area name='CanSat' type='monotone' dataKey='humidityCanSat' stroke='#ff8f00' fill='#ffc107' />
                <Area name='Externí' type='monotone' dataKey='humidityExternal' stroke='#007AC1' fill='#67DAFF' />
                <Legend verticalAlign="bottom"/>
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default HumidityChart;
