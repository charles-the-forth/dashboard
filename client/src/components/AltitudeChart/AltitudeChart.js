import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, CartesianGrid, Legend, Tooltip, Label } from 'recharts';

const AltitudeChart = ({ config, data }) => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 5, bottom: 0 }} className="chart">
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis domain={[450, 670]}>
                    <Label value="[m]" offset={-12} angle={-90} position="left" />
                </YAxis>
                <Area name="External" type='monotone' dataKey='altitudeExternal' stroke='#e64a19' fill='#ff5722' strokeWidth={5} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AltitudeChart;
