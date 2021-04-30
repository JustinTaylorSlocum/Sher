import ChatMessage from './chatMessage';
import RoomAnnouncement from './roomAnnouncement';
import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import { Scrollbar } from "react-scrollbars-custom";

function MessageList() {
  const scrollRef = useRef(null);
  const [messageList, updateMessageList] = useState([]);
  const [p, setP] = useState('');

  useEffect(() => {
    socket.on('chat message', msg => {
      let tempMsgList = messageList;
      tempMsgList.push({username: msg.username, text: msg.text, time: msg.time, color: msg.color, type: msg.type});
      updateMessageList(...tempMsgList);
      setP(messageList.map(msg => 
      (msg.type == "user-message"
      ? <li key={Math.random()} ref={scrollRef} className="chat-message"><ChatMessage username={msg.username} color={msg.color} text={msg.text} time={msg.time}/></li>
      : <li key={Math.random()} ref={scrollRef} className="room-announcement"><RoomAnnouncement text={msg.text} time={msg.time}/></li>
      )
      ));
      console.log(messageList);
    })

  }, []);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [p]);


  return (
    <ul className="chat-messages">
          <Scrollbar>
            {p}
          </Scrollbar>
    </ul>

  );
}

export default MessageList;
