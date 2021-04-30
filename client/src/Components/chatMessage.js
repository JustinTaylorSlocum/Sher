
function ChatMessage(props) {

  return (
      <>
          <span className="chat-message-text">
            <h2 style={{marginBlockStart: '0.0em', marginBlockEnd:'0.0em'}}>
            <span className="msg-username" style={{color:props.color}}>{props.username}</span>
            <span className="msg-time-stamp">{props.time}</span>
            </h2>
            <span className="msg-text">{props.text}</span>
          </span>
      </>
  );
}

export default ChatMessage;
