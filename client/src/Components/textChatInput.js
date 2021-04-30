
import '../App.css';
import React, { useState, useEffect } from 'react';
import socket from '../socket';
import SendIcon from '@material-ui/icons/Send';
import Picker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

var timeout = undefined;

function TextChatInput(props) {
  const [messageState, setMessageState] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [emojiSelect, setEmojiSelect] = useState(false);

  const handleSend = () => {
    socket.emit('chat message', messageState);
  }

  const timeoutF = () => {
    setIsTyping(false);
    socket.emit('isTyping', {typing: false});
  }

  const handleInputChange = (e) => {
    setMessageState(e.target.value);

    setIsTyping(true);
    socket.emit('isTyping', {typing: true});
    clearTimeout(timeout)
    timeout = setTimeout(timeoutF, 4000);
  }
  
  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const sendMessage = async () => {
    if (messageState.length > 0) {
      await handleSend();
      setMessageState("");
      clearTimeout(timeout);
      setIsTyping(false);
  }
  }

  const onEmojiClick = (event, emojiObject) => {
    setMessageState(messageState + emojiObject.emoji);
  };

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
        {emojiSelect ? <div style={{position:'absolute',zIndex:'1000000000000', right:'6px', bottom:'54px'}}><Picker pickerStyle={{boxShadow:'none'}}onEmojiClick={(e, i) => onEmojiClick(e, i)}/></div> : null}
        {emojiSelect ? <div onClick={() => setEmojiSelect(false)} style={{position:'fixed', inset:'0px'}}></div> : null}    
            <div className="input-bar">
              <input value={messageState} type="text" placeholder="Send a message" onKeyDown={e => handleSubmit(e)} onChange={e => handleInputChange(e)}/>
              <EmojiEmotionsIcon className="emoji-button" onClick={() => setEmojiSelect(!emojiSelect)}/>
              <SendIcon className="send-button" onClick={() => sendMessage()}/>
            </div>
        </div>
        </>
  );
}

export default TextChatInput;