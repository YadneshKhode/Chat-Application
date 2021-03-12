import React from "react";
import Message from "./message.component";
import { connect } from "react-redux";

const ChatMessage = React.memo(({ username, messages }) => {
  const length = messages.length - 1;
  return (
    <>
      {messages.map((mess, i) => (
        <div key={i}>
          <Message mess={mess} username={username} length={length} i={i} />
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
