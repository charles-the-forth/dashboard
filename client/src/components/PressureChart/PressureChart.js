import React from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, ResponsiveContainer, Label, Tooltip } from 'recharts';
import { reduce, max, min } from 'ramda';

const PressureChart = ({ config, data }) => {
    const maxValue = reduce(max, 990, data) + 10;
    const minValue = reduce(min, 990, data) - 10;

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={config.height}>
                <AreaChart data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className='chart'>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <YAxis domain={[930, 960]}>                    
                        <Label value="[hPa]" offset={-14} angle={-90} position="left" />
                    </YAxis>
                    <Area name='Pressure BME' type='monotone' dataKey='pressureExternal' stroke='#311b92' fill='#5e35b1' strokeWidth={5} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PressureChart;
