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
import { assocPath, pipe } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import "firebase/firestore";

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
      temperature: [
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        },
        {
          temperatureCanSat: 28.0,
          temperatureExternal: 27.0,
          temperatureMPU: 26.0,
        }
      ],
      pressure: [
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        },
        {
          pressureCanSat: 1001,
          pressureExternal: 1010,
        }
      ],
      humidity: [
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
        {
          humidityCanSat: 10,
          humidityExternal: 15,
        },
      ],
      lightIntensity: [
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        },
        {
          lightIntensity: 250,
        }
      ],
      altitude: [
        {
          altitudeCanSat: 600,
          altitudeExternal: 620,
        },
        {
          altitudeCanSat: 600,
          altitudeExternal: 620,
        },
        {
          altitudeCanSat: 600,
          altitudeExternal: 620,
        },
        {
          altitudeCanSat: 600,
          altitudeExternal: 620,
        },
        {
          altitudeCanSat: 600,
          altitudeExternal: 620,
        },
      ],
      airQuality: [
        {
          airQuality: 25,
        },
        {
          airQuality: 25,
        },
        {
          airQuality: 25,
        },
        {
          airQuality: 25,
        },
        {
          airQuality: 25,
        },
      ],
      shuntVoltage: [
        {
          shuntVoltage: 12.0
        },
        {
          shuntVoltage: 12.0
        },
        {
          shuntVoltage: 12.0
        },
        {
          shuntVoltage: 12.0
        },
        {
          shuntVoltage: 12.0
        },
        {
          shuntVoltage: 12.0
        },
      ],
      busVoltage: [
        {
          busVoltage: 12.0
        },
        {
          busVoltage: 12.0
        },
        {
          busVoltage: 12.0
        },
        {
          busVoltage: 12.0
        },
        {
          busVoltage: 12.0
        },
        {
          busVoltage: 12.0
        },
      ],
      loadVoltage: [
        {
          loadVoltage: 25
        },
        {
          loadVoltage: 25
        },
        {
          loadVoltage: 25
        },
        {
          loadVoltage: 25
        },
        {
          loadVoltage: 25
        },
        {
          loadVoltage: 25
        },
      ],
      current: [
        {
          current: 50
        },
        {
          current: 50
        },
        {
          current: 50
        },
        {
          current: 50
        },
        {
          current: 50
        },
        {
          current: 50
        },
        {
          current: 50
        },
      ],
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
        }
      },
      center: {
        lat: 50.03718,
        lng: 15.779902
      },
      hour: 0,
      minute: 0,
      second: 0
    };
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
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={classes.paper}>
              <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={classes.paper}>
              <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
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
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={`${classes.paper} ${classes.airQualityPaper}`}>
              <AirQualityChart data={this.state.airQuality} config={this.state.config.airQuality} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={`${classes.paper} ${classes.shuntVoltagePaper}`}>
              <ShuntVoltageChart data={this.state.shuntVoltage} config={this.state.config.shuntVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={`${classes.paper} ${classes.busVoltagePaper}`}>
              <BusVoltageChart data={this.state.busVoltage} config={this.state.config.busVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={`${classes.paper} ${classes.loadVoltagePaper}`}>
              <LoadVoltageChart data={this.state.loadVoltage} config={this.state.config.loadVoltage} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper className={`${classes.paper} ${classes.currentPaper}`}>
              <CurrentChart data={this.state.current} config={this.state.config.current} />
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
