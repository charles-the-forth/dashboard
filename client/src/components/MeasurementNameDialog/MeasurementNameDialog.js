import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class MeassurementNameDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  nameChanged(event) {
    this.setState({name: event.target.value});
  }

  numberChanged(event) {
    this.setState({number: event.target.value});
  }

  render() {
    const { open, handleCancel, handleCreate } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nové měření</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Abyste mohli začít měřit, zadejte prosím název měření.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Název měření"
            type="text"
            onChange={this.nameChanged.bind(this)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Číslo měření"
            type="number"
            onChange={this.numberChanged.bind(this)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Zrušit
            </Button>
          <Button onClick={() => handleCreate(this.state)} color="primary">
            Začít měřit
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MeassurementNameDialog.defaultProps = {
  open: false,
  handleCancel: () => {},
  handleCreate: () => {}
};


export default MeassurementNameDialog; 
