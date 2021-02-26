import React from "react";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
const Input = React.memo(({ message, setMessage, sendMessage }) => {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={
            
            (e) => (e.key === "Enter" ? sendMessage(e) : null)
            
            
            }
        />
        {/* <button onClick={(e) => sendMessage(e)}>
          Send message
        </button> */}
      </form>
      <IconButton onClick={(e) => sendMessage(e)}>
        <SendIcon />
      </IconButton>
    </>
  );
})

export default Input;
