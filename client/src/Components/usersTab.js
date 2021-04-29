import React, { useState, useEffect } from 'react';
import socket from '../socket';
import { ListItem, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function UsersTab() { 
    const [roomUsers, setRoomUsers] = useState([]);

    useEffect(() => {
        socket.on('roomUsers', users => {
            setRoomUsers(users);
        });
    }, []);



  return (
      <ul onClick={console.log(roomUsers)} className="user-list">
            {roomUsers.map((user) => (
                <ListItem style={{color:'white'}} button className="user-list-item">
                    <AccountCircleIcon style={{marginRight:'6px'}}/>
                    <ListItemText>{user.username}</ListItemText>
                </ListItem>
                ))}
      </ul>

  );
}

export default UsersTab;
