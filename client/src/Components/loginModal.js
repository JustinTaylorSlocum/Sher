import React, { useState, useEffect } from 'react';
import { FormGroup, Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import socket from '../socket';

function LoginModal(props) {
    const [modal, setModal] = useState(true);
    const [username, setUsername] = useState('');

    const handleToggle = () => { setModal(!modal) };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length > 0) {
            socket.emit('join', username);
            // Close modal
            handleToggle();
        }
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

  return (
        <Dialog open={modal} maxWidth='sm' fullWidth>
                <DialogTitle id="customized-dialog-title">
                    Welcome to SmodooChat!
                </DialogTitle>

                <DialogContent dividers>
                    <FormGroup>
                    <TextField
                    name="username"
                    label="Username"
                    onChange={e => handleChange(e)}
                    required
                    />
                    </FormGroup>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary">
                    Continue
                    </Button>
                </DialogActions>
                </Dialog>
  );
}

export default LoginModal;
