import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alighItems: 'center',
        flexDirection: 'column'
    }
});

const Video = ({ config, classes }) => {
  return (
    <div style={{ height: config.height + 'px', width: '100%' }} className={classes.container}>
        <h1>Video</h1>
    </div>);
};

export default withStyles(styles)(Video);
