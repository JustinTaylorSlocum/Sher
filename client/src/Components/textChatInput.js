
import '../App.css';
import React, {useState, useEffect, useRef} from 'react';
import socket from '../socket';
import InputEmoji from "react-input-emoji";

var timeout = undefined;


function TextChatInput(props) {
  const [messageState, setMessageState] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  const textInput = useRef(null);

  const handleSend = () => {
    socket.emit('chat message', messageState);
  }

  const timeoutF = () => {
    setIsTyping(false);
    socket.emit('isTyping', {typing: false});
  }

  const handleInputChange = (e) => {
    setMessageState(e);

    setIsTyping(true);
    socket.emit('isTyping', {typing: true});
    clearTimeout(timeout)
    timeout = setTimeout(timeoutF, 4000);
  }
  
  const handleEnter = async () => {
      if (messageState.length > 0) {
        await handleSend();
        setMessageState("");
        textInput.current.focus();
    }
  }

  useEffect(() => {
    socket.on('isTyping', data => {
      if (data.typing) {
        setIsTyping(true);
        setTypingUser(data.user);
      } else {
        clearTimeout(timeout);
        setIsTyping(false);
        setTypingUser('');
      }
    });
  });

  return (
    <>
        <div className="chat-bar">
        {(isTyping ? <span className="is-typing-label">{typingUser} is typing...</span> : <span className="is-typing-label"> </span>)}
            <InputEmoji ref={textInput} value={messageState} type="messageText" placeholder="Send a message" onEnter={handleEnter} onChange={(e) => handleInputChange(e)}/>
        </div>
        </>
  );
}

export default TextChatInput;