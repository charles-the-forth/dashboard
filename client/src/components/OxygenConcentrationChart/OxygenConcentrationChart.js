import React from 'react';
import Typography from '@material-ui/core/Typography';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Legend } from 'recharts';
import { takeLast } from 'ramda';

const OxygenConcentrationChart = ({ config, data }) => {
    console.log(data);
    return (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Oxygen concentration</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={takeLast(config.maxShowedValues, data)}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, 100]}>
                    <Label value="%" offset={20} position="insideLeft" angle={-90}/>
                </YAxis>
                <Area name='O2' type='monotone' dataKey='oxygenConcentration' stroke='#311b92' fill='#6746C3' />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);
    }; 

export default OxygenConcentrationChart;
