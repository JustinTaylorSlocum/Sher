
function ChatMessage(props) {

  return (
        <li key={props} className="chat-message">
          <span style={{textAlign: 'left'}}>
            <span className="msg-username">{props.username}</span>
            <span className="msg-text">{props.text}</span>
          </span>

        </li>
  );
}

export default ChatMessage;
