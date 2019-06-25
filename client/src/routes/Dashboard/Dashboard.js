import React, { Component } from 'react';
import openSocket from 'socket.io-client'
import TemperatureChart from '../../components/TemperatureChart/TemperatureChart';
import PressureChart from '../../components/PressureChart/PressureChart';
import HumidityChart from '../../components/HumidityChart/HumidityChart';
import LightIntensityChart from '../../components/LightIntensityChart/LightIntensityChart';
import AltitudeChart from '../../components/AltitudeChart/AltitudeChart';
import OxygenConcentrationChart from '../../components/OxygenConcentrationChart/OxygenConcentrationChart';
import CO2ConcentrationChart from '../../components/CO2ConcentrationChart/CO2ConcentrationChart';
import SpectroscopeChart from '../../components/SpectroscopeChart/SpectroscopeChart';
import MapTile from '../../components/MapTile/MapTile';
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
    margin: '10px',
    width: 'calc(100% - 32px)'
  },
  bottomPaper: {
    marginTop: '16px'
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
      co2: [],
      tvoc: [],
      oxygenConcentration: [],
      spectroscope: [
        {
          name: 'a', value: 4000, wavelength: 410,
        },
        {
          name: 'b', value: 3000, wavelength: 435,
        },
        {
          name: 'c', value: 2000, wavelength: 460,
        },
        {
          name: 'd', value: 2780, wavelength: 485,
        },
        {
          name: 'e', value: 1890, wavelength: 510,
        },
        {
          name: 'f', value: 2390, wavelength: 535,
        },
        {
          name: 'g', value: 3490, wavelength: 560,
        },
        {
          name: 'h', value: 4000, wavelength: 585,
        },
        {
          name: 'r', value: 3000, wavelength: 610,
        },
        {
          name: 'i', value: 2000, wavelength: 645,
        },
        {
          name: 's', value: 2780, wavelength: 680,
        },
        {
          name: 'j', value: 1890, wavelength: 705,
        },
        {
          name: 't', value: 2390, wavelength: 730,
        },
      ],
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
        spectroscope: {},
        oxygenConcentration: {
          maxShowedValues: 20
        },
        co2: {
          maxShowedValues: 20
        },
        spectroscope: {
          a: {
            color: '#7e00db',
            wavelength: 410,
          },
          b: {
            color: '#2300ff',
            wavelength: 435,
          },
          c: {
            color: '#007bff',
            wavelength: 460,
          },
          d: {
            color: '#00eaff',
            wavelength: 485,
          },
          e: {
            color: '#00ff00',
            wavelength: 510,
          },
          f: {
            color: '#70ff00',
            wavelength: 535,
          },
          g: {
            color: '#c3ff00',
            wavelength: 560,
          },
          h: {
            color: '#ffef00',
            wavelength: 585,
          },
          r: {
            color: '#ff9b00',
            wavelength: 610,
          },
          i: {
            color: '#ff0000',
            wavelength: 645,
          },
          s: {
            color: '#ff0000',
            wavelength: 680,
          },
          j: {
            color: '#f60000',
            wavelength: 705,
          },
          t: {
            color: '#c80000',
            wavelength: 730,
          }
        }
      },
      center: {
        lat: 50.03718,
        lng: 15.779902
      },
      socket: openSocket('http://localhost:5000', { transports: ['websocket'] })
    };

    this.state.socket.on('data updated', (data) => {
      const {
        messageId, numberOfSatellites, temperature, lat, lng, pressure, humidity, lightIntensity, altitude, co2, tvoc, oxygenConcetration, radioStrength, spectroscope
      } = data;
      this.setState({
        messageId, numberOfSatellites,
        center: {
          lat, lng
        },
        temperature: append(temperature, this.state.temperature),
        pressure: append(pressure, this.state.pressure),
        humidity: append(humidity, this.state.humidity),
        lightIntensity: append(lightIntensity, this.state.lightIntensity),
        altitude: append(altitude, this.state.altitude),
        co2: append(co2, processCO2(this.state.co2)),
        tvoc: append(tvoc, this.state.tvoc),
        oxygenConcentration: append({oxygenConcetration}, this.state.oxygenConcentration),
        signal: processRadioStrength(radioStrength),
        spectroscope: processSpectroscope(spectroscope, this.state.config.spectroscope),
      });

      console.log(data);
    });
  }

  updateDimensions() {
    const spacingAndStuffLikeThat = 184;
    const titleHeight = 68;

    this.setState(pipe(
      assocPath(['config', 'map', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
      assocPath(['config', 'temperature', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'pressure', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'humidity', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'lightIntensity', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'altitude', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - 32),
      assocPath(['config', 'infoTile', 'height'], (((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight) / 2) / 2),
      assocPath(['config', 'spectroscope', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2 - 32),
      assocPath(['config', 'oxygenConcentration', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'co2', 'height'], ((window.innerHeight - spacingAndStuffLikeThat) / 2 - titleHeight - 43) / 2),
      assocPath(['config', 'map', 'height'], (window.innerHeight - spacingAndStuffLikeThat) / 2),
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
        <CanSatAppBar signal={this.state.signal}>
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
            <Paper className={`${classes.paper} ${classes.bottomPaper}`}>
              <PressureChart data={this.state.pressure} config={this.state.config.pressure} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <HumidityChart data={this.state.humidity} config={this.state.config.humidity} />
            </Paper>
            <Paper className={`${classes.paper} ${classes.bottomPaper}`}>
              <LightIntensityChart data={this.state.lightIntensity} config={this.state.config.lightIntensity} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <OxygenConcentrationChart data={this.state.oxygenConcentration} config={this.state.config.oxygenConcentration} />
            </Paper>
            <Paper className={`${classes.paper} ${classes.bottomPaper}`}>
              <CO2ConcentrationChart data={this.state.co2} config={this.state.config.co2} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Paper className={classes.paper}>
              <SpectroscopeChart data={this.state.spectroscope} config={this.state.config.spectroscope} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
              <Paper className={classes.paper}>
                <AltitudeChart data={this.state.altitude} config={this.state.config.altitude} />
              </Paper>
          </Grid>
        </Grid>
      </div >
    );
  }
}

const processRadioStrength = radioStrength => {
  if (radioStrength > -45) {
    return 100;
  } else if (radioStrength > -60) {
    return 75;
  } else if (radioStrength > -90) {
    return 50;
  } else if (radioStrength > -120) {
    return 25;
  } else {
    return 0;
  }
}

const processSpectroscope = (spectroscope, config) => [
  {
    name: 'a', value: spectroscope.a, wavelength: config.a.wavelength
  },
  {
    name: 'b', value: spectroscope.b, wavelength: config.b.wavelength
  },
  {
    name: 'c', value: spectroscope.c, wavelength: config.c.wavelength
  },
  {
    name: 'd', value: spectroscope.d, wavelength: config.d.wavelength
  },
  {
    name: 'e', value: spectroscope.e, wavelength: config.e.wavelength
  },
  {
    name: 'f', value: spectroscope.f, wavelength: config.f.wavelength
  },
  {
    name: 'g', value: spectroscope.g, wavelength: config.g.wavelength
  },
  {
    name: 'h', value: spectroscope.h, wavelength: config.h.wavelength
  },
  {
    name: 'r', value: spectroscope.r, wavelength: config.r.wavelength
  },
  {
    name: 'i', value: spectroscope.i, wavelength: config.i.wavelength
  },
  {
    name: 's', value: spectroscope.s, wavelength: config.s.wavelength
  },
  {
    name: 'r', value: spectroscope.r, wavelength: config.r.wavelength
  },
  {
    name: 't', value: spectroscope.t, wavelength: config.t.wavelength
  },
];

const processCO2 = ({time, SCD30, CCS811}) => ({
  time,
  SCD30: 100 * SCD30 / 1000000,
  CCS811: 100 * CCS811 / 1000000,
});

export default withStyles(styles)(Dashboard);
