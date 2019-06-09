import React, { Component } from 'react';
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import PressureChart from '../../components/PressureChart/PressureChart';
import HumidityChart from '../../components/HumidityChart/HumidityChart';
import LightIntensityChart from '../../components/LightIntensityChart/LightIntensityChart';
import AltitudeChart from '../../components/AltitudeChart/AltitudeChart';
import AirQualityChart from '../../components/AirQualityChart/AirQualityChart';
import InfoTile from '../../components/InfoTile/InfoTile';
import ShuntVoltageChart from '../../components/ShuntVoltageChart/ShuntVoltageChart';
import BusVoltageChart from '../../components/BusVoltageChart/BusVoltageChart';
import LoadVoltageChart from '../../components/LoadVoltageChart/LoadVoltageChart';
import CurrentChart from '../../components/CurrentChart/CurrentChart';
import SpeedXChart from '../../components/SpeedXChart/SpeedXChart';
import SpeedYChart from '../../components/SpeedYChart/SpeedYChart';
import SpeedZChart from '../../components/SpeedZChart/SpeedZChart';
import RotationXChart from '../../components/RotationXChart/RotationXChart';
import RotationYChart from '../../components/RotationYChart/RotationYChart';
import RotationZChart from '../../components/RotationZChart/RotationZChart';
import MagnetometerXChart from '../../components/MagnetometerXChart/MagnetometerXChart';
import MagnetometerYChart from '../../components/MagnetometerYChart/MagnetometerYChart';
import MagnetometerZChart from '../../components/MagnetometerZChart/MagnetometerZChart';
import { assocPath, pipe } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as firebase from "firebase/app";
import "firebase/firestore";
import MapTile from '../../components/MapTile/MapTile';

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
      accelerationX: [],
      accelerationY: [],
      accelerationZ: [],
      rotationX: [],
      rotationY: [],
      rotationZ: [],
      magnetometerX: [],
      magnetometerY: [],
      magnetometerZ: [],
      temperature: [],
      pressure: [],
      humidity: [],
      lightIntensity: [],
      altitude: [],
      airQuality: [],
      shuntVoltage: [],
      busVoltage: [],
      loadVoltage: [],
      current: [],
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
        infoTile: {},
        airQuality: {
          maxShowedValues: 20
        },
        shuntVoltage: {
          maxShowedValues: 20
        },
        busVoltage: {
          maxShowedValues: 20
        },
        loadVoltage: {
          maxShowedValues: 20
        },
        current: {
          maxShowedValues: 20
        },
        accelerationX: {
          maxShowedValues: 20
        },
        accelerationY: {
          maxShowedValues: 20
        },
        accelerationZ: {
          maxShowedValues: 20
        },
        rotationX: {
          maxShowedValues: 20
        },
        rotationY: {
          maxShowedValues: 20
        },
        rotationZ: {
          maxShowedValues: 20
        },
        magnetometerX: {
          maxShowedValues: 20
        },
        magnetometerY: {
          maxShowedValues: 20
        },
        magnetometerZ: {
          maxShowedValues: 20
        }
      },
      center:{},
      hour: 0,
      minute: 0,
      second: 0
    };


    const db = firebase.firestore();

    db.collection("results")
      .orderBy("messageId")
      .onSnapshot(querySnapshot => {
        const temperature = [];
        const pressure = [];
        const humidity = [];
        const lightIntensity = [];
        const altitude = [];
        const accelerationX = [];
        const accelerationY = [];
        const accelerationZ = [];
        const rotationX = [];
        const rotationY = [];
        const rotationZ = [];
        const magnetometerX = [];
        const magnetometerY = [];
        const magnetometerZ = [];
        const airQuality = [];
        const shuntVoltage = [];
        const busVoltage = [];
        const loadVoltage = [];
        const current = [];
        let messageId, year, month, day, hour, second, minute, lat, lng, numberOfSatellites;
        const center = {};

        querySnapshot.forEach(doc => {
          const data = doc.data();
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

          temperature.push({
            temperatureCanSat: data.temperatureCanSat,
            temperatureExternal: data.temperatureExternal,
            temperatureMPU: data.temperatureMPU,
          });

          pressure.push({
            pressureCanSat: data.pressureCanSat,
            pressureExternal: data.pressureExternal
          });

          humidity.push({
            humidityCanSat: data.humidityCanSat,
            humidityExternal: data.humidityExternal,
          });

          lightIntensity.push({ lightIntensity: data.light });

          accelerationX.push({ accelerationX: data.accelerationX });
          accelerationY.push({ accelerationY: data.accelerationY });
          accelerationZ.push({ accelerationZ: data.accelerationZ });

          rotationX.push({ rotationX: data.rotationX });
          rotationY.push({ rotationY: data.rotationY });
          rotationZ.push({ rotationZ: data.rotationZ });

          magnetometerX.push({ magnetometerX: data.magnetometerX });
          magnetometerY.push({ magnetometerY: data.magnetometerY });
          magnetometerZ.push({ magnetometerZ: data.magnetometerZ });

          altitude.push({ altitudeCanSat: data.altitudeCanSat, altitudeExternal: data.altitudeExternal });

          airQuality.push({ airQuality: data.airQuality });

          shuntVoltage.push({ shuntVoltage: data.shuntVoltage });

          busVoltage.push({ busVoltage: data.busVoltage });

          loadVoltage.push({ loadVoltage: data.loadVoltage });

          current.push({ current: data.current });

          if (lat !== 0 && lng !== 0) {
            center.lat = lat;
            center.lng = lng;
          }
        });

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

        let allIterator = 0;
        let seriesIndex = 0;
        const magnetometerXArrays = [{data: [], seriesIndex}];

        magnetometerX.forEach(it => {
          if (allIterator === 0) {
            magnetometerXArrays[seriesIndex].data[allIterator] = {magnetometerX: it.magnetometerX};
          } else {
            console.log(magnetometerXArrays);

            const nextNumber = it.magnetometerX + magnetometerXArrays[seriesIndex].data[allIterator - 1].magnetometerX; 
            
            console.log('nextNumber: ' + nextNumber);

            if (nextNumber > 180) {
              magnetometerXArrays[seriesIndex].data[allIterator] = 180;

              seriesIndex++;

              magnetometerXArrays[seriesIndex] = {data: [], seriesIndex};

              magnetometerXArrays[seriesIndex].data[allIterator] = {magnetometerX: -180};
              allIterator++;
              magnetometerXArrays[seriesIndex].data[allIterator] = {magnetometerX: nextNumber - 360};
            } else {
              magnetometerXArrays[seriesIndex].data.push({
                magnetometerX: nextNumber
              });
            }
          }

          allIterator++;
        });

        this.setState({
          temperature, pressure, humidity,
          lightIntensity, altitude,
          messageId, year, month, day, hour, second, minute, numberOfSatellites, center,
          accelerationX, accelerationY, accelerationZ,
          rotationX, rotationY, rotationZ,
          magnetometerX: magnetometerXArrays, magnetometerY,
          magnetometerZ, airQuality,
          shuntVoltage, loadVoltage, current,
          busVoltage
        });

        console.log(this.state);
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
      assocPath(['config', 'lightIntensity', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight + 28),
      assocPath(['config', 'altitude', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight + 28),
      assocPath(['config', 'airQuality', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'shuntVoltage', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'busVoltage', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'loadVoltage', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'current', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'accelerationX', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'accelerationY', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'accelerationZ', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'rotationX', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'rotationY', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'rotationZ', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'magnetometerX', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'magnetometerY', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'magnetometerZ', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
    )(this.state));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { classes } = this.props;

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
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.altitudePaper}`}>
              <AltitudeChart data={this.state.altitude} config={this.state.config.altitude} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.infoTileGrid}>
            <InfoTile icon={'message'} title='Message ID' text={this.state.messageId} />
            <InfoTile icon={'satellite'} title='Number of satellites' text={this.state.numberOfSatellites} />
            <InfoTile icon={'calendar_today'} title='Date' text={formatDate(this.state.day, this.state.month, this.state.year)} />
            <InfoTile icon={'access_time'} title='Time' text={formatTime(this.state.hour, this.state.minute, this.state.second)} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.airQualityPaper}`}>
              <AirQualityChart data={this.state.airQuality} config={this.state.config.airQuality} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.shuntVoltagePaper}`}>
              <ShuntVoltageChart data={this.state.shuntVoltage} config={this.state.config.shuntVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.busVoltagePaper}`}>
              <BusVoltageChart data={this.state.busVoltage} config={this.state.config.busVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.loadVoltagePaper}`}>
              <LoadVoltageChart data={this.state.loadVoltage} config={this.state.config.loadVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.currentPaper}`}>
              <CurrentChart data={this.state.current} config={this.state.config.current} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.accelerationXPaper}`}>
              <SpeedXChart data={this.state.accelerationX} config={this.state.config.accelerationX} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.accelerationYPaper}`}>
              <SpeedYChart data={this.state.accelerationY} config={this.state.config.accelerationY} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.accelerationZPaper}`}>
              <SpeedZChart data={this.state.accelerationZ} config={this.state.config.accelerationZ} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.rotationXPaper}`}>
              <RotationXChart data={this.state.rotationX} config={this.state.config.rotationX} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.rotationYPaper}`}>
              <RotationYChart data={this.state.rotationY} config={this.state.config.rotationY} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.rotationZPaper}`}>
              <RotationZChart data={this.state.rotationZ} config={this.state.config.rotationZ} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.magnetometerXPaper}`}>
              <MagnetometerXChart data={this.state.magnetometerX} config={this.state.config.magnetometerX} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.magnetometerYPaper}`}>
              <MagnetometerYChart data={this.state.magnetometerY} config={this.state.config.magnetometerY} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={`${classes.paper} ${classes.magnetometerZPaper}`}>
              <MagnetometerZChart data={this.state.magnetometerZ} config={this.state.config.magnetometerZ} />
            </Paper>
          </Grid>
        </Grid>
      </div >
    );
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