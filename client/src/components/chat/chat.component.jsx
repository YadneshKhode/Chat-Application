import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import "./chat.style.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import Input from "../input/input.component";
import ChatMessage from "./chat-message.component";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import queryString from "query-string";
import InfoBar from "../infoBar/infobar.component";
import {
  addUser,
  addRoom,
  addCurrentMessage,
  addToMessages,
} from "../../redux/chats/chats.action";
import { connect } from "react-redux";
let socket;
// let user;
const Chat = React.memo((props) => {
  const { addUserName, addRoomName, addMessage, addMessToArr } = props;
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  // const ENDPOINT = "";
  const location = useLocation();
  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(username);
    addUserName(username);
    setRoom(room);
    addRoomName(room);
    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off(); // turn off the current connection instance.
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (fulldata) => {
      // user = fulldata;
      setMessages([...messages, fulldata]);
      addMessToArr(fulldata);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("Inside sendMessage");
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
        addMessage("");
      });

      console.log("message = " + message);
    }
  };
  // console.log("message = " + JSON.stringify(message));
  // console.log("messages = " + JSON.stringify(messages));
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <InfoBar room={room} />
        <div className="chat__headerRight">
          <IconButton>
            <a href="/">
              <CancelRoundedIcon />
            </a>
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <ChatMessage username={username} messages={messages} />
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserName: (name) => dispatch(addUser(name)),
    addRoomName: (room) => dispatch(addRoom(room)),
    addMessage: (message) => dispatch(addCurrentMessage(message)),
    addMessToArr: (message) => dispatch(addToMessages(message)),
  };
};

export default connect(null, mapDispatchToProps)(Chat);
