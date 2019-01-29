import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../images/cansat.png';
import { withStyles } from '@material-ui/core/styles';
import SignalProgress from '../SignalProgress/SignalProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    appBar: {
        backgroundColor: 'white',
        color: 'black'
    },
    logo: {
        width: '36px',
        paddingRight: '8px'
    },
    grow: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'center'
    },
    signalContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
        width: '212px'
    }
});

const CanSatAppBar = ({ classes, signal, children }) => {
    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
                <img src={logo} className={classes.logo} alt="logo" />
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap>
                    Charles the Fourth
                </Typography>
                <div className={classes.grow}>
                    {children}
                </div>
                <div className={classes.signalContainer}>
                    <SignalProgress signal={signal}/>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(styles)(CanSatAppBar);