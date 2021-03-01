import React from "react";

const Message = ({mess:{user,message,createdAt}, username}) => {
  console.log("message in message component= " + message);
  let isSentByCurrentUser = false;
  const trimmedName = username.trim().toLowerCase();
  if (user === trimmedName) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <p className="chat__message chat__receiver">
    <span className="chat__name">{user}</span>
    {message}
    <span className="chat__timestamp">{createdAt}</span>
  </p>
  ) :(
    <p className="chat__message">
    <span className="chat__name">{user}</span>
    {message}
    <span className="chat__timestamp">{createdAt}</span>
  </p>
  );
};

export default Message;
