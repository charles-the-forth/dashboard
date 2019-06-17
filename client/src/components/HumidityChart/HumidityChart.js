import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Tooltip } from 'recharts';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height={config.height}>
            <AreaChart data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <YAxis domain={[0, 100]}>
                    <Label value="[%]" offset={-18} angle={-90} position="left" />
                </YAxis>
                <Area name='External' type='monotone' dataKey='humidityExternal' stroke='#007AC1' fill='#67DAFF' strokeWidth={5} />
            </AreaChart>
        </ResponsiveContainer>        
    </div>
);

export default HumidityChart;
