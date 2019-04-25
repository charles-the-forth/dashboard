import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './routes/Dashboard/Dashboard';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme/theme';
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import { config } from './config';

export const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => (
              <Switch>
                <Route exact path='/results' component={Dashboard} />
                <Redirect from='*' to='/results' />
              </Switch>
          )}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    </MuiThemeProvider>
  );
};