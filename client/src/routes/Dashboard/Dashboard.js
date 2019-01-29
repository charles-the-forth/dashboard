import React, { Component } from 'react';
import openSocket from 'socket.io-client'
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import { append, pathOr, propOr } from 'ramda';
import PressureChart from '../../components/PressureChart/PressureChart';
import SpeedChart from '../../components/SpeedChart/SpeedChart';
import HeightChart from '../../components/HeightChart/HeightChart';
import MapTile from '../../components/MapTile/MapTile';
import { withStyles } from '@material-ui/core/styles';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
        lat: parseFloat(propOr(0, 'value', lat)),
        lng: parseFloat(propOr(0, 'value', lng))
      }));

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
          <Grid item lg={6}>
            <Link to='/dashboard/1/temperature' className={classes.link}>
              <Paper className={classes.paper}>
                <TemperatureChart data={this.state.temperature} config={this.state.config.temperature} />
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={6}>
            <Link to='/dashboard/1/pressure' className={classes.link}>
              <Paper className={classes.paper}>
                <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={3}>
            <Link to='/dashboard/1/speed' className={classes.link}>
              <Paper className={classes.paper}>
                <SpeedChart data={this.state.speed} config={this.state.config.speed} />
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={3}>
            <Link to='/dashboard/1/height' className={classes.link}>
              <Paper className={classes.paper}>
                <HeightChart data={this.state.height} config={this.state.config.height} />
              </Paper>
            </Link>
          </Grid>
          <Grid item lg={6}>
            <Link to='/dashboard/1/map' className={classes.link}>
              <Paper className={classes.paper}>
                <MapTile lat={this.state.lat} lng={this.state.lng} style={{ height: '380px' }} />
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </div >
    );
  }
}

export default withStyles(styles)(Dashboard);
