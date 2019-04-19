import React, { Component } from 'react';
import openSocket from 'socket.io-client'
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import PressureChart from '../../components/PressureChart/PressureChart';
import HumidityChart from '../../components/HumidityChart/HumidityChart';
import LightIntensityChart from '../../components/LightIntensityChart/LightIntensityChart';
import MapTile from '../../components/MapTile/MapTile';
import { append, pathOr, tail } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  logo: {
    width: '36px',
    paddingRight: '8px'
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black'
  },
  link: {
    textDecoration: 'none'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justifyContent: 'center',
    aligContent: 'center',
  },
  mainGrid: {
    margin: '16px',
    width: 'calc(100% - 32px)'
  }
});

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: [],
      pressure: [],
      humidity: [],
      lightIntensity: [],
      acceleration: [],
      rotation: [],
      config: {
        temperature: {
          maxShowedValues: 20
        },
        pressure: {
          maxShowedValues: 20
        },
        humidity: {
          maxShowedValues: 20
        },
        lightIntensity: {
          maxShowedValues: 20
        },
        acceleration: {
          maxShowedValues: 20
        },
        rotation: {
          maxShowedValues: 20
        }
      },
      lat: 0,
      lng: 0,
      socket: openSocket('http://localhost:5000', { transports: ['websocket'] })
    };

    this.state.socket.on('data updated', ({ temperature, pressure, humidity, lightIntensity, acceleration, rotation }) => {
      this.setState({
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure),
        humidity: append(humidity, this.state.humidity),
        lightIntensity: append(lightIntensity, this.state.lightIntensity),
        acceleration: append(acceleration, this.state.acceleration),
        rotation: append(rotation, this.state.rotation),
      });
      if (this.state.temperature.length > this.state.config.temperature.maxShowedValues) {
        this.setState({
          temperature: tail(this.state.temperature),
          pressure: tail(this.state.pressure),
          humidity: tail(this.state.humidity),
          lightIntensity: tail(this.state.lightIntensity),
          acceleration: tail(this.state.acceleration),
          rotation: tail(this.state.rotation)
        });
      }
    });
      
  }

  redirect = (pathname) => () => this.props.history.push({ pathname });

  render() {
    const { classes, location } = this.props;
    return (
      <div>
        <CanSatAppBar signal={80}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap>
            {pathOr('', ['state', 'measurement', 'name'], location)}
          </Typography>
        </CanSatAppBar>
        <Grid container spacing={16} className={classes.mainGrid}>
          <Grid item lg={4}>
            <Paper className={classes.paper}>
              <MapTile center={{
                lat: 50.0310364,
                lng: 15.7936385
              }}/>
            </Paper>
          </Grid>
          <Grid item lg={4} spacing={16}>
            <Paper className={classes.paper}></Paper>
            <Paper className={classes.paper}></Paper>
            <Paper className={classes.paper}></Paper>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item lg={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper className={classes.paper}>
              <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper className={classes.paper}>
              <TemperatureChart
                data={this.state.temperature}
                config={this.state.config.temperature} />
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper className={classes.paper}>
              <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper className={classes.paper}>
              <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
            </Paper>
          </Grid>          
        </Grid>
      </div >
    );
  }
}

export default withStyles(styles)(Dashboard);
