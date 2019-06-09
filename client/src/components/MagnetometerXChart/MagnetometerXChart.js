import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@material-ui/core/Typography';

const MagnetometerXChart = ({ config, data }) => (
    <div className="chart-container">
        <Typography variant="h5" gutterBottom>Natočení k mag. pólu v ose x [°]</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <LineChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis />
                {data.map(it => {
                    console.log(it);
                    return (
                <Line name="Natočení k mag. pólu v ose x [°]" data={it.data} type='monotone' dataKey='magnetometerX' name={it.seriesIndex} key={it.seriesIndex} stroke='#0277bd' />);
                    })}
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default MagnetometerXChart;
