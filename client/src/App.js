import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      pressure: 0,
      socket: openSocket('http://localhost:5000', {transports: ['websocket']})
    };

    this.state.socket.on('data updated', ({temperature, pressure}) => this.setState({temperature, pressure}));
  }

  render() {

    return (
      <div className="App">
        <h1>Temperature: {this.state.temperature} °C Pressure: {this.state.pressure} hPa</h1>
      </div>
    );
  }
}

export default App;
