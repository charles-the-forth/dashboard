import React from 'react';
import { AreaChart, Area, Legend, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';

const HumidityChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Vlkost vzduchu [%]</h2>
        <AreaChart width={450} height={360} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Area name='BME interní' type='monotone' dataKey='humidityCanSat' stroke='#000063' fill='#6746C3' />
            <Area name='BME externí' type='monotone' dataKey='humidityExternal' stroke='#C79100' fill='#FFF350' />
        </AreaChart>
    </div>
);

export default HumidityChart;
