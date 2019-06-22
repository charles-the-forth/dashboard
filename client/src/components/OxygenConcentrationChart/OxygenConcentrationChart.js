import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { takeLast } from 'ramda';

const OxygenConcentrationChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Oxygen concentration</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <Area name='O2' type='monotone' dataKey='oxygenConcetration' stroke='#311b92' fill='#6746C3' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
); 

export default OxygenConcentrationChart;
