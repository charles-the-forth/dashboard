import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../images/cansat.png';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'

const styles = theme => ({
    logo: {
        width: '36px',
        paddingRight: '8px'
    },
    appBar: {
        backgroundColor: 'white',
        color: 'black'
    },
    mainGrid: {
        width: 'calc(100% - 32px)',
        margin: '16px 8px'
    },
    addButtonLink: {
        position: 'fixed',
        bottom: '16px',
        right: '16px'
    },
    addIcon: {
        color: 'white'
    },
    row: {
        marginTop: '16px'
    }
});

class Manager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            measurements: [
                {
                    id: 4,
                    name: 'Čtvrté měření',
                    timeStart: new Date('January 15, 2019 15:24:00'),
                    timeEnd: new Date('January 15, 2019 15:29:00')
                },
                {
                    id: 3,
                    name: 'Třetí měření',
                    timeStart: new Date('January 14, 2019 15:24:00'),
                    timeEnd: new Date('January 14, 2019 15:29:00')
                },
                {
                    id: 2,
                    name: 'Druhé měření',
                    timeStart: new Date('January 13, 2019 15:24:00'),
                    timeEnd: new Date('January 13, 2019 15:29:00')
                },
                {
                    id: 1,
                    name: 'První měření',
                    timeStart: new Date('January 12, 2019 15:24:00'),
                    timeEnd: new Date('January 12, 2019 15:29:00')
                }
            ]
        };
    }

    twoZeroFormat = number => number < 10 ? '0' + number : number;

    renderMeasurement = ({ id, name, timeStart, timeEnd }) => (
        <Grid item key={id}>
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Název
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {name}
                    </Typography>
                    <div className={this.props.classes.row}>
                        <Icon>calendar_today</Icon>
                        <Typography color="textSecondary" gutterBottom>
                            {timeStart.getDate()}. {timeStart.getMonth() + 1}. {timeStart.getFullYear()}
                        </Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Icon>access_time</Icon>
                        <Typography color="textSecondary">
                            {timeStart.getHours()}:{this.twoZeroFormat(timeStart.getMinutes())}:{this.twoZeroFormat(timeStart.getSeconds())} - {timeEnd.getHours()}:{this.twoZeroFormat(timeEnd.getMinutes())}:{this.twoZeroFormat(timeEnd.getSeconds())}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small">Zobrazit výsledky</Button>
                </CardActions>
            </Card>
        </Grid>
    );

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                    </Toolbar>
                </AppBar>
                <Grid container spacing={16} className={classes.mainGrid}>
                    {this.state.measurements.map(this.renderMeasurement)}
                </Grid>
                <Link to={'/dashboard/1'} className={classes.addButtonLink}>
                    <Fab color="primary" aria-label="New measurement">
                        <Icon className={classes.addIcon}>add</Icon>
                    </Fab>
                </Link>
            </div >
        );
    }
}

export default withStyles(styles)(Manager);