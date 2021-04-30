
function RoomAnnouncement(props) {

    return (
        <>
            <span className="chat-message-text">
              <span className="msg-text" style={{fontStyle: 'italic', color: 'white'}}>{props.text}</span>
            </span>
        </>
    );
  }
  
  export default RoomAnnouncement;
  