import ChatMessage from './chatMessage'
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import socket from '../socket';



function MessageList(props) {
  const [messageList, updateMessageList] = useState([]);
  const [p, setP] = useState('');

  useEffect(() => {
    socket.on('chat message', msg => {
      console.log("NEW MESSAGE");
      let tempMsgList = messageList;
      tempMsgList.push({user:'Anonymous', text: msg});
      updateMessageList(tempMsgList);
      setP(messageList.map(msg => <ChatMessage username={msg.user} text={msg.text}/>));
      console.log(messageList);
    })
  }, []);


  return (
        <ul className="chat-messages">
          {p}
        </ul>
  );
}

export default MessageList;
