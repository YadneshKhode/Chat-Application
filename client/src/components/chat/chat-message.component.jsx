import React from "react";
import Message from "./message.component"
import { connect } from "react-redux";

const ChatMessage = React.memo(({ username, messages }) => {
  const length = messages.length - 1; // used to find the last message so I can add useRef to it and use scrolllIntoView by comparing the index and length 
  return (
    <>
      {messages.map((mess, i) => (
        <div key={i}>
          <Message mess={mess} username={username} length={length} i={i} />
          {/* passing index so I can compare it with length to find th elast message */}
        </div>
      ))}
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    username: state.chat.username,
    messages: state.chat.messages,
  };
};

export default connect(mapStateToProps)(ChatMessage);
