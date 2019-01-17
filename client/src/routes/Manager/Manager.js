import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import MeasurementNameDialog from '../../components/MeasurementNameDialog/MeasurementNameDialog';
import CanSatAppBar from '../../components/CanSatAppBar/CanSatAppBar';

const styles = theme => ({
    mainGrid: {
        width: 'calc(100% - 32px)',
        margin: '16px 8px'
    },
    addButton: {
        position: 'fixed',
        bottom: '16px',
        right: '16px'
    },
    addIcon: {
        color: 'white'
    },
    row: {
        marginTop: '16px'
    },
    measurementName: {
        height: '62px',
        maxHeight: '62px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    measurementCard: {
        height: '300px'
    }
});

class Manager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            measurements: [
                {
                    id: 4,
                    name: 'Čtvrté měření s dlouhým názvem',
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

    handleCancel() {
        this.setState({openDialog: false});
    }

    handleCreate({ number, name }) {
        this.setState({openDialog: false});
        this.props.history.push(`/dashboard/${number}`);
    }

    openNameDialog() {
        this.setState({openDialog: true});
    }

    openDashboard(number) {
        this.props.history.push(`/dashboard/${number}`);
    }

    renderMeasurement = ({ id, name, timeStart, timeEnd }) => (
        <Grid item key={id} lg={2}>
            <Card className={this.props.classes.measurementCard}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Název
                    </Typography>
                    <Typography variant="h5" component="h2" className={this.props.classes.measurementName}>
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
                <CardActions className={this.props.classes.cardActions}>
                    <Button size="small" color="secondary" onClick={() => this.openDashboard(id)}>Zobrazit výsledky</Button>
                </CardActions>
            </Card>
        </Grid>
    );

    render() {
        const { classes } = this.props;
        return (
            <div>
                <CanSatAppBar signal={80}/>
                <Grid container spacing={16} className={classes.mainGrid}>
                    {this.state.measurements.map(this.renderMeasurement)}
                </Grid>
                <Fab color="primary" aria-label="New measurement" onClick={this.openNameDialog.bind(this)} className={classes.addButton}>
                    <Icon className={classes.addIcon}>add</Icon>
                </Fab>
                <MeasurementNameDialog open={this.state.openDialog} handleCancel={this.handleCancel.bind(this)} handleCreate={this.handleCreate.bind(this)} />
            </div>
        );
    }
}

export default withStyles(styles)(Manager);