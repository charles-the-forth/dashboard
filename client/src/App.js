import React, { Component } from 'react';
import './App.css';
import openSocket from 'socket.io-client'
import TemperatureChart from './TemperatureChart/TemperatureChart';
import { append } from 'ramda';
import PressureChart from './PressureChart/PressureChart';
import SpeedChart from './SpeedChart/SpeedChart';
import HeightChart from './HeightChart/HeightChart';
import MapTile from './MapTile/MapTile';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import logo from './images/cansat.png';

const styles = theme => ({
  logo: {
    width: '36px',
    paddingRight: '8px'
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black'
  }
});

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
      lat: 0,
      lng: 0,
      socket: openSocket('http://localhost:5000', { transports: ['websocket'] })
    };

    this.state.socket.on('data updated', ({ temperature, pressure, speed, height, lat, lng }) =>
      this.setState({
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure),
        speed: append(speed, this.state.speed),
        height: append(height, this.state.height),
        lat: parseFloat(lat.value),
        lng: parseFloat(lng.value)
      }));

  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <img src={logo} className={classes.logo} alt="logo"/>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap>
              Charles the Fourth
            </Typography>            
          </Toolbar>
        </AppBar>
        <div className="charts-container">
          <TemperatureChart data={this.state.temperature} config={this.state.config.temperature} />
          <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
          <div className="double-chart-container">
            <SpeedChart data={this.state.speed} config={this.state.config.speed} />
            <HeightChart data={this.state.height} config={this.state.config.height} />
          </div>
          <MapTile lat={this.state.lat} lng={this.state.lng} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
