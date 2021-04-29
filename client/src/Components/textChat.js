import TextChatInput from './textChatInput';
import MessageList from './messageList';
import React, { useState, useEffect } from 'react';
import ChatTabs from '../Components/chatTabs';
import UsersTab from '../Components/usersTab';

function TextChat(props) {
  const [showTextChat, setTextChat] = useState(true);

  const toggleTextChat = (b) => {
    setTextChat(b);
  }

  const messagePanel = <><MessageList className="hide" socket={props.socket}/><TextChatInput socket={props.socket}/></>;
  const usersPanel = <span>USER PANEL FILLER</span>;

  return (
          <div className="chat-container">
              <div className="chat">
                    <ChatTabs toggleTextChat={toggleTextChat}/>

                      <div className={showTextChat ? "chatTab" : "hide"}>
                        <MessageList socket={props.socket}/><TextChatInput socket={props.socket}/>
                      </div>

                      <div className={!showTextChat ? "chatTab" : "hide"}>
                        <UsersTab/>
                      </div>

              </div>
          </div>
  );
}

export default TextChat;
