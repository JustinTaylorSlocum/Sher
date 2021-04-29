import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, ListItemText, ListItem, List, Divider, IconButton, Typography, Slide, AppBar, Toolbar, ListItemAvatar, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import socket from '../socket';
import youtube from '../youtube';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
function SearchModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
  
    const handleClickOpen = async() => {
      setOpen(true);
      if (props.searchQuery.length > 0) {
        const response = await youtube.get('/search', {
            params: {
                q: props.searchQuery
            }
        });
        setSearchResults(response.data.items);
    };
}
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{opacity: '0.97'}}>
          <SearchIcon style={{color:'white'}}/>
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
              <SearchIcon style={{color:'white', fontSize:'1em', marginRight:'5px'}}/>Search Results
              </Typography>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
              {searchResults.map((video) => (
                <>
                <ListItem button onClick={() => {props.selectVideo(video.id.videoId); handleClose()}}>
                    <ListItemAvatar>
                            <img src={video.snippet.thumbnails.default.url}></img>
                    </ListItemAvatar>
                    <ListItemText primary={video.snippet.title} secondary={video.snippet.channelTitle}/>
                </ListItem>
                <Divider style={{backgroundColor:'#ffffff42'}}/>
                </>
              ))}
          </List>
        </Dialog>
      </div>
    );
  }

  export default SearchModal;