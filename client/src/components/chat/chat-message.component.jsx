import React from "react";
import "./chat.style.css";
import Message from "./message.component";
import ScrollToBottom from "react-scroll-to-bottom";
import { connect } from "react-redux";

const ChatMessage = React.memo(({ username, messages }) => {
  return (
      <ScrollToBottom>
        {messages.map((mess, i) => (
          <div key={i}>
            <Message mess={mess} username={username} />
          </div>
        ))}
      </ScrollToBottom>
  );
});

const mapStateToProps = (state) => {
  return {
    username: state.chat.username,
    messages: state.chat.messages,
  };
};

export default connect(mapStateToProps)(ChatMessage);

