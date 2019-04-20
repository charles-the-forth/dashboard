import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../images/cansat.png';

const styles = theme => ({
    container: {
        height: '48px',
        width: '48px',
        borderRadius: '50%',
        position: 'relative',
        top: '-24px',
        left: '-24px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: '32px',
        width: '32px'
    }
});

const MapMarker = withStyles(styles)(({classes}) => (
    <div className={classes.container}>
        <img src={logo} alt='Charles the Fourth logo' className={classes.icon}/>
    </div>
));

export default MapMarker;
