import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client'
import TemperatureChart from './TemperatureChart/TemperatureChart';
import {append} from 'ramda';
import PressureChart from './PressureChart/PressureChart';
import SpeedChart from './SpeedChart/SpeedChart';
import HeightChart from './HeightChart/HeightChart';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: [],
      pressure: [],
      speed: [],
      height: [],
      config: {
        temperature: {
          maxShowedValues: 40
        },
        pressure: {
          maxShowedValues: 40
        },
        speed: {
          maxShowedValues: 20
        },
        height: {
          maxShowedValues: 20
        }
      },
      socket: openSocket('http://localhost:5000', {transports: ['websocket']})
    };

    this.state.socket.on('data updated', ({temperature, pressure, speed, height}) => 
      this.setState({
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure),
        speed: append(speed, this.state.speed),
        height: append(height, this.state.height)
      }));
      
  }

  render() {
    console.log(this.state.temperature);
    return (
      <div className="charts-container">
        <TemperatureChart data={this.state.temperature} config={this.state.config.temperature}/>
        <PressureChart data={this.state.pressure} config={this.state.config.pressure}/>
        <div className="double-chart-container">
          <SpeedChart data={this.state.speed} config={this.state.config.speed}/>
          <HeightChart data={this.state.height} config={this.state.config.height}/>
        </div>
      </div>
    );
  }
}

export default App;
