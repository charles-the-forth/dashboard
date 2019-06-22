import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const SpectroscopeChart = ({ config, data }) => {
    console.log(data);
    return (
    <div className="chart-container">
        <Typography component="h1" variant="h6" color="inherit" noWrap>Spectroscope</Typography>
        <ResponsiveContainer width="100%" height={config.height}>
            <BarChart width={150} height={40} data={data}>
                <Bar dataKey="value" fill="#8884d8">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={config[entry.name].color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
    );
                };

export default SpectroscopeChart;
