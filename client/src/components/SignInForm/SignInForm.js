import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";

const styles = theme => ({
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        color: 'white'
    }
});

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleFormSubmit() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <TextField
                        id="standard-password-input"
                        label="Email"
                        className={classes.email}
                        type="email"
                        margin="normal"
                        onChange={this.handleEmailChange.bind(this)}
                        value={this.state.email} />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        onChange={this.handlePasswordChange.bind(this)}
                        value={this.state.password} />
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleFormSubmit.bind(this)}>
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignInForm);
