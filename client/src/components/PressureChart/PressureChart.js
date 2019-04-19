import React from 'react';
import { AreaChart, Area, Legend, YAxis, CartesianGrid } from 'recharts';
import { takeLast } from 'ramda';
import './PressureChart.css';

const PressureChart = ({ config, data }) => (
    <div className="chart-container">
        <h2>Tlak [hPa]</h2>
        <AreaChart width={450} height={360} data={takeLast(config.maxShowedValues, data)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }} style={{cursor: 'pointer'}}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Area name='BME280 interní' type='monotone' dataKey='pressureCanSat' stroke='#007AC1' fill='#67DAFF' />
            <Area name='BME280 externí' type='monotone' dataKey='pressureExternal' stroke='#001064' fill='#5F5FC4' />
        </AreaChart>
    </div>
);

export default PressureChart;
