import React from "react";
// import React, { useState, useEffect } from "react";
import "./chat.style.css";
import Message from "./message.component";
import ScrollToBottom from "react-scroll-to-bottom";
// const io = require("socket.io-client");
// const socket = io();

const ChatMessage = React.memo(({ username, messages }) => {
  return (
    <ScrollToBottom>
      {/* chat__receiver give this class if you are receiver of the message*/}
      {messages.map((mess, i) => (
        <div key={i}>
          <Message mess={mess} username={username} />
        </div>
      ))}
    </ScrollToBottom>
  );
});
export default ChatMessage;

// eslint-disable-next-line no-lone-blocks
{
  /* <p className="chat__message chat__receiver">
  <span className="chat__name">{username}</span>
  {mess}
  <span className="chat__timestamp">{{createdAt}}</span>
</p>; */
}
