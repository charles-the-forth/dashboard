import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client'
import TemperatureChart from './TemperatureChart/TemperatureChart';
import {append} from 'ramda';
import PressureChart from './PressureChart/PressureChart';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: [],
      pressure: [],
      config: {
        temperature: {
          maxShowedValues: 40
        },
        pressure: {
          maxShowedValues: 40
        }
      },
      socket: openSocket('http://localhost:5000', {transports: ['websocket']})
    };

    this.state.socket.on('data updated', ({temperature, pressure}) => 
      this.setState({
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure)
      }));
      
  }

  render() {
    return (
      <div className="charts-container">
        <TemperatureChart data={this.state.temperature} config={this.state.config.temperature}/>
        <PressureChart data={this.state.pressure} config={this.state.config.pressure}/>
      </div>
    );
  }
}

export default App;
