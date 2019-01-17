import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const classes = theme => ({
    signalContainer: {
        marginTop: '8px',
        width: '212px'
    },
    progress: {
        height: '16px'
    },
    progressContainer: {
        width: '100px'
    }
});

const SignalProgress = ({ classes, signal }) => (
    <div className={classes.progressContainer}>
        <LinearProgress variant="determinate" value={signal} className={classes.progress} />
        <Typography align="center" variant="body1" className={classes.signalLabel}>
            Signál
        </Typography>
    </div>
);

export default withStyles(classes)(SignalProgress);