import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { takeLast, reduce, max, min } from 'ramda';
import Typography from '@material-ui/core/Typography';

const PressureChart = ({ config, data }) => {
    const maxValue = reduce(max, 990, data) + 10;
    const minValue = reduce(min, 990, data) - 10;

    return (
        <div className="chart-container">
            <Typography variant="h5" gutterBottom>Tlak [hPa]</Typography>
            <ResponsiveContainer width="100%" height={config.height}>
                <AreaChart data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis domain={[minValue, maxValue]}/>
                    <Area name='Tlak CanSat' type='monotone' dataKey='pressureCanSat' stroke='#1976d2' fill='#2196f3' />
                    <Area name='Tlak BME' type='monotone' dataKey='pressureExternal' stroke='#311b92' fill='#5e35b1' />
                    <Legend verticalAlign="bottom" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PressureChart;
