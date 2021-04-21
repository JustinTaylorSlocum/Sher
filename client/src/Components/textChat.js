import TextChatInput from './textChatInput';
import MessageList from './messageList';
import React, { useState, useEffect } from 'react';

function TextChat(props) {

  useEffect(() => {
    console.log(props.socket);

  }, []);


  return (
          <div className="chat-container">
              <div className="chat">
                    <MessageList socket={props.socket}/>
                    <TextChatInput socket={props.socket}/>
              </div>
          </div>
  );
}

export default TextChat;
