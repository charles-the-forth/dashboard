import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    paper: {
        padding: '6px 8px',
        textAlign: 'left',
        color: theme.palette.text.secondary,
        justifyContent: 'left',
        aligContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: '12px'
    },
    text: {
        margin: 0,
        fontSize: '32px'
    },
    icon: {
        fontSize: '36px',
        marginRight: '8px'
    }
});

const InfoTile = withStyles(styles)(({ icon, title, text, classes, config }) => (
    <Paper className={classes.paper} style={{height: config.height + 'px'}}>
        <Typography variant="h6" gutterBottom className={classes.title}>{title}</Typography>
        <div className={classes.row}>
            <Icon className={classes.icon}>{icon}</Icon>
            <Typography variant="h3" gutterBottom className={classes.text}>{text}</Typography>
        </div>
    </Paper>
));

export default InfoTile;
