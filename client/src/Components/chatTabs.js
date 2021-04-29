import TextChatInput from './textChatInput';
import MessageList from './messageList';
import React, { useState, useEffect } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { Tabs, Tab } from '@material-ui/core';

function ChatTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
        <div className="chat-tabs">
            <Tabs
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            value={value}
            onChange={handleChange}
            >
                <Tab onClick={() => props.toggleTextChat(true)} style={{borderRight: '0.01px solid black', color:'white'}} icon={<ChatBubbleOutlineOutlinedIcon style={{fontSize:'1.3em', marginBottom: '1px'}}/>} label="Chat"/>
                <Tab onClick={() => props.toggleTextChat(false)} style={{color:'white'}} icon={<PeopleAltOutlinedIcon style={{fontSize:'1.3em', marginBottom: '1px'}}/>} label="Users"/>
            </Tabs>
        </div>
  );
}

export default ChatTabs;
