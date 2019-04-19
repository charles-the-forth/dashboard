import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './routes/Dashboard/Dashboard';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme/theme';

export const App = () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Redirect from='*' to='/' />
    </Switch>
  </MuiThemeProvider>
);