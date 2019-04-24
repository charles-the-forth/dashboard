import React, { Component } from 'react';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import PressureChart from '../../components/PressureChart/PressureChart';
import HumidityChart from '../../components/HumidityChart/HumidityChart';
import LightIntensityChart from '../../components/LightIntensityChart/LightIntensityChart';
import AltitudeChart from '../../components/AltitudeChart/AltitudeChart';
import MapTile from '../../components/MapTile/MapTile';
import InfoTile from '../../components/InfoTile/InfoTile';
import Video from '../../components/Video/Video';
import { assocPath, pipe, reverse } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as firebase from "firebase/app";
import "firebase/firestore";
import logo from '../../images/cansat.png';

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
  },
  altitudePaper: {
    marginTop: '16px'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column'
  },
  loadingLogo: {
    height: '256px',
    width: '256px',
    marginBottom: '32px'
  }
});

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      temperature: [],
      pressure: [],
      humidity: [],
      lightIntensity: [],
      altitude: [],
      config: {
        map: {},
        video: {},
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
        lat: 50.03718,
        lng: 15.779902
      },
      hour: 0,
      minute: 0,
      second: 0
    };

    const db = firebase.firestore();

    db.collection("messages")
      .orderBy("messageId", "desc")
      .limit(25)
      .onSnapshot(querySnapshot => {
        const temperature = [];
        const pressure = [];
        const humidity = [];
        const lightIntensity = [];
        const altitude = [];
        let messageId, year, month, day, hour, second, minute, lat, lng, numberOfSatellites;
        let first = true;
        let ready = false;

        querySnapshot.forEach(doc => {
          const data = doc.data();
          console.log(data);
          if (first) {
            messageId = data.messageId;
            year = data.year;
            month = data.month;
            day = data.day;
            hour = data.hour;
            second = data.second;
            minute = data.minute;
            lat = data.lat;
            lng = data.lng;
            numberOfSatellites = data.numberOfSatellites;
            ready = true;
          }

          temperature.push(data.temperature);
          pressure.push(data.pressure);
          humidity.push(data.humidity);
          lightIntensity.push(data.lightIntensity);
          altitude.push(data.altitude);
        });

        const center = {};
        if (lat !== 0 && lng !== 0) {
          center.lat = lat;
          center.lng = lng;
        } else {
          center.lat = this.state.lat;
          center.lng = this.state.lng;
        }

        if (year === 2000 && month === 0 && day === 0) {
          year = this.state.year;
          month = this.state.month;
          day = this.state.day;
        }

        if (hour === 0 && minute === 0 && second === 0) {
          hour = this.state.hour;
          minute = this.state.minute;
          second = this.state.second;
        }

        this.setState({
          temperature: reverse(temperature), pressure: reverse(pressure), humidity: reverse(humidity),
          lightIntensity: reverse(lightIntensity), altitude: reverse(altitude), messageId, year, month, day, hour, second, minute, numberOfSatellites,
          center, ready: this.state.ready ? true : ready
        });
      });
  }

  updateDimensions() {
    const spacingAndStuffLikeThat = 184;
    const titleHeight = 68;
    this.setState(pipe(
      assocPath(['config', 'map', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'video', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'temperature', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight + 28),
      assocPath(['config', 'pressure', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight + 28),
      assocPath(['config', 'humidity', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight + 28),
      assocPath(['config', 'lightIntensity', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 16 - 43) / 2),
      assocPath(['config', 'altitude', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 16 - 43) / 2),
    )(this.state));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { classes } = this.props;

    if (this.state.ready) {
      return (
        <div>
          <CanSatAppBar signal={80}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap>
            </Typography>
          </CanSatAppBar>
          <Grid container spacing={16} className={classes.mainGrid}>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>
                <Video config={this.state.config.video} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>
                <MapTile center={this.state.center} config={this.state.config.map} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>
                <TemperatureChart
                  data={this.state.temperature}
                  config={this.state.config.temperature} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
                <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
                <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper className={classes.paper}>
                <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
              </Paper>
              <Paper className={`${classes.paper} ${classes.altitudePaper}`}>
                <AltitudeChart data={this.state.altitude} config={this.state.config.altitude} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.infoTileGrid}>
              <InfoTile icon={'message'} title='Message ID' text={this.state.messageId} />
              <InfoTile icon={'satellite'} title='Number of satellites' text={this.state.numberOfSatellites} />
              <InfoTile icon={'calendar_today'} title='Date' text={formatDate(this.state.day, this.state.month, this.state.year)} />
              <InfoTile icon={'access_time'} title='Time' text={formatTime(this.state.hour, this.state.minute, this.state.second)} />
            </Grid>
          </Grid>
        </div >
      );
    } else {
      return (
        <div className={classes.loadingContainer}>
            <img src={logo} className={classes.loadingLogo} alt="logo" />
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              noWrap>
              Chvilku strpení
            </Typography>
        </div>        
      );
    }
  }
}

const formatDate = (day, month, year) => {
  if (day !== undefined && month !== undefined && year !== undefined) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return day + ' ' + months[month - 1] + ' ' + year;
  }
  return '';
};

const formatTime = (hour, minute, second) => {
  if (hour !== undefined && minute !== undefined && second !== undefined) {
    return ((hour < 10) ? '0' + hour.toString() : hour) + ':' + ((minute < 10) ? ('0' + minute.toString()) : minute) + ':' + ((second < 10) ? ('0' + second.toString()) : second);
  }
  return '';
};
export default withStyles(styles)(Dashboard);
