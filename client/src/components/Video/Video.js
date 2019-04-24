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
        <iframe
            src="https://player.twitch.tv/?channel=charles4th_cansat&autoplay=true"
            height={config.height}
            width="100%"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true"
            title="livestream">
        </iframe>
    </div>);
};

export default withStyles(styles)(Video);
