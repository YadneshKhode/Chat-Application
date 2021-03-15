import React, { useRef, useEffect } from "react";
const Message = ({
  mess: { user, message, createdAt },
  username,
  i,
  length,
}) => {
  let isSentByCurrentUser = false;

  console.log("user",user);
  console.log("username",username);
  
  if (user === username) isSentByCurrentUser = true;

  const lastMessageRef = useRef();
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  });
  console.log("i = " + i + "  length = " + length);
  return isSentByCurrentUser ? (
    <p
      className="chat__message chat__receiver"
      ref={i === length ? lastMessageRef : null}
    >
      <span className="chat__name">{user}</span>
      <div className="chatContainer">
        <span className="chat__mess">{message}</span>
        <span className="chat__timestamp">{createdAt}</span>
      </div>
    </p>
  ) : (
    <p className="chat__message" ref={i === length ? lastMessageRef : null}>
      <span className="chat__name">{user}</span>
      {message}
      <span className="chat__timestamp">{createdAt}</span>
    </p>
  );
};
export default Message;
