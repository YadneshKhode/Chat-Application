import React, { useRef, useEffect } from "react";
const Message = ({
  mess: { user, message, createdAt },
  username,
  i,
  length,
}) => {
  // console.log("message in message component= " + message);

  //Finding out if the message was sent by the currentUser or someone else ( because in messages array it is stored as {sender: xyz, message:"hello"} we figure out if the sender is currentUser render the message with different CSS)
  let isSentByCurrentUser = false;
  const trimmedName = username.trim().toLowerCase();
  if (user === trimmedName) isSentByCurrentUser = true;

  //This logic is used to scroll down automatically whenever a message is sent.
  //we are adding useRef ( lastMessageRef ) to the last message in the array using "i" which pass passed as prop from parent component ( i = index of the array of messages ) and length of the array to calculate last which is last message and adding the useRef attribute to it and doing scrollIntoView.
  //current is inbuilt property of useRef ( The whole element is saved in it ( in this current property of useRef in our case the <p> whole element is stored there)  )

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
