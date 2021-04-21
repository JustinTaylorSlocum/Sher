
import '../App.css';
import React, {useState} from 'react';
import Axios from 'axios';
import socket from '../socket';

function TextChatInput(props) {
  const [messageState, setMessageState] = useState("");


  const handleSend = () => {
    socket.emit('chat message', messageState);
  }

  const handleInputChange = (e) => {
    setMessageState(e.target.value);
    console.log(messageState);
  }
  
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleSend();
      setMessageState("");
    }
  }

  return (
        <div className="input-bar">
            <input value={messageState} type="messageText" placeholder="Send a message" onKeyDown={handleKeyDown} onChange={(e) => handleInputChange(e)}></input>
        </div>
  );
}

export default TextChatInput;
