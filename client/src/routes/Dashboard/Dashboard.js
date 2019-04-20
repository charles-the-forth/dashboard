import React, { Component } from 'react';
import openSocket from 'socket.io-client'
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import PressureChart from '../../components/PressureChart/PressureChart';
import HumidityChart from '../../components/HumidityChart/HumidityChart';
import LightIntensityChart from '../../components/LightIntensityChart/LightIntensityChart';
import AltitudeChart from '../../components/AltitudeChart/AltitudeChart';
import MapTile from '../../components/MapTile/MapTile';
import InfoTile from '../../components/InfoTile/InfoTile';
import { append, pathOr, assocPath, pipe } from 'ramda';
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
    margin: '12px',
    width: 'calc(100% - 32px)'
  },
  infoTileGrid: {
    display: 'grid',
    gridRowGap: '16px'
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
      altitude: [],
      config: {
        map: {},
        temperature: {
          maxShowedValues: 25
        },
        pressure: {
          maxShowedValues: 25
        },
        humidity: {
          maxShowedValues: 20
        },
        lightIntensity: {
          maxShowedValues: 20
        },
        altitude: {
          maxShowedValues: 20
        },
        infoTile: {}
      },
      center: {
        lat: 0,
        lng: 0,
      },
      socket: openSocket('http://localhost:5000', { transports: ['websocket'] })
    };

    this.state.socket.on('data updated', ({
      messageId, numberOfSatellites, lat, lng, day, month, year, hour, minute, second, temperature, pressure, humidity, lightIntensity, altitude
     }) => {
      this.setState({
        messageId, numberOfSatellites,
        center: {
          lat,
          lng
        },
        day, month, year,
        hour, minute, second,
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure),
        humidity: append(humidity, this.state.humidity),
        lightIntensity: append(lightIntensity, this.state.lightIntensity),
        altitude: append(altitude, this.state.altitude)
      });
      console.log(this.state);
    });
  }

  updateDimensions() {
    console.log('window.innerHeight');
    const spacingAndStuffLikeThat = 184;
    const titleHeight = 68;
    this.setState(pipe(
      assocPath(['config', 'map', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'temperature', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight),
      assocPath(['config', 'pressure', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight),
      assocPath(['config', 'humidity', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight),
      assocPath(['config', 'lightIntensity', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight),
      assocPath(['config', 'altitude', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight),
    )(this.state));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

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
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper className={classes.paper}>
              <MapTile center={this.state.center} config={this.state.config.map} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper className={classes.paper}>
              <TemperatureChart
                data={this.state.temperature}
                config={this.state.config.temperature} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper className={classes.paper}>
              <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper className={classes.paper}>
              <AltitudeChart data={this.state.altitude} config={this.state.config.altitude} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper className={classes.paper}>
              <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper className={classes.paper}>
              <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoTileGrid}>
            <InfoTile icon={'message'} title='Message ID' text={this.state.messageId} />
            <InfoTile icon={'satellite'} title='Number of satellites' text={this.state.numberOfSatellites} />
            <InfoTile icon={'calendar_today'} title='Date' text={formatDate(this.state.day, this.state.month, this.state.year)} />
            <InfoTile icon={'access_time'} title='Time' text={formatTime(this.state.hour, this.state.minute, this.state.second)} />
          </Grid>
        </Grid>
      </div >
    );
  }
}

const formatDate = (day, month, year) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return day + ' ' + months[month] + ' ' + year;
};

const formatTime = (hour, minute, second) => ((hour < 10) ? '0' + hour.toString() : hour) + ':' + ((minute < 10) ? ('0' + minute.toString()): minute) + ':' + ((second < 10) ? ('0' + second.toString()): second);

export default withStyles(styles)(Dashboard);
