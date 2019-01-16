import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './routes/Dashboard/Dashboard';
import HeightDetail from './routes/HeightDetail/HeightDetail';
import Manager from './routes/Manager/Manager';
import MapDetail from './routes/MapDetail/MapDetail';
import PressureDetail from './routes/PressureDetail/PressureDetail';
import SpeedDetail from './routes/SpeedDetail/SpeedDetail';
import TemperatureDetail from './routes/TemperatureDetail/TemperatureDetail';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme/theme';

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route exact path='/dashboard/:number' component={Dashboard} />
      <Route path='/dashboard/:number/temperature' component={TemperatureDetail} />
      <Route path='/dashboard/:number/pressure' component={PressureDetail} />
      <Route path='/dashboard/:number/speed' component={SpeedDetail} />
      <Route path='/dashboard/:number/height' component={HeightDetail} />
      <Route path='/dashboard/:number/map' component={MapDetail} />
      <Route exact path='/' component={Manager} />
      <Redirect from='*' to='/' />
    </Switch>
  </MuiThemeProvider>
);