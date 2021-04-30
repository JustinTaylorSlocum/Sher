import React, { useState, useEffect } from 'react';
import { FormGroup, Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import socket from '../socket';
import { SketchPicker } from 'react-color'

const useStyles = makeStyles({
    root: {
        background: "black"
    },
    paper: {
        backgroundColor: '#c31850 !important'
    },
});

function LoginModal(props) {
    const [modal, setModal] = useState(true);
    const [username, setUsername] = useState('');
    const [colorPickDisplay, setColorPickDisplay] = useState(false);
    const [ucolor, setUcolor] = useState('#FFFFFF');

    const classes = useStyles();

    

    const handleToggle = () => { setModal(!modal) };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length > 0) {
            socket.emit('join', username, ucolor);
            // Close modal
            handleToggle();
        }
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleColorOpenClose = async(p) => {
        console.log("SETTING");
        console.log(p);
        await setColorPickDisplay(p);
        console.log(colorPickDisplay);
    }

  return (
            <Dialog id="loginModal" open={modal} maxWidth='xl'>
                            <DialogTitle id="customized-dialog-title">
                                Welcome to Sher™!
                            </DialogTitle>

                            <DialogContent dividers>
                                <FormGroup>
                                    <ListItem>
                                    <TextField
                                name="username"
                                fullWidth
                                label="Username"
                                size='medium'
                                onChange={e => handleChange(e)}
                                required
                                />
                                
                                <div className="color-pick-button"><div onClick={() => handleColorOpenClose(true)} style={{width:'32px',height:'32px',background:ucolor}}></div>
                                {colorPickDisplay ? <div onClick={() => handleColorOpenClose(false)} style={{position:'fixed', inset:'0px'}}></div> : null}
                                {colorPickDisplay ? <div style={{position:'relative',zIndex:'1000000000000', left:'-188px'}} ><div style={{position:'fixed'}}><SketchPicker disableAlpha color={ucolor} onChange={color => setUcolor(color.hex)}/></div></div> : null}
                                </div>
                            
                                    </ListItem>
                                    
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
