import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      socket: openSocket('http://localhost:5000', {transports: ['websocket']})
    };

    this.state.socket.on('change color', color => this.setState({color}));
  }

  send() {
    this.state.socket.emit('request change color', 'request change color');
  }

  render() {

    return (
      <div className="App" style={{backgroundColor: this.state.color}}>
        <button onClick={this.send.bind(this)}>Send</button>
      </div>
    );
  }
}

export default App;
