import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        justifyContent: 'left',
        aligContent: 'center',
        maxHeight: `${76 - theme.spacing.unit * 2}px`
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
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

const InfoTile = withStyles(styles)(({ icon, title, text, classes }) => (
    <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom className={classes.title}>{title}</Typography>
        <div className={classes.row}>
            <Icon className={classes.icon}>{icon}</Icon>
            <Typography variant="h3" gutterBottom className={classes.text}>{text}</Typography>
        </div>
    </Paper>
));

export default InfoTile;
