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
  clearState,
} from "../../redux/chats/chats.action";
import { connect } from "react-redux";
let socket;
const Chat = React.memo((props) => {
  const {
    addUserName,
    addRoomName,
    addMessage,
    addMessToArr,
    clearChatState,
  } = props;
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const location = useLocation();
  useEffect(() => {
    clearChatState();
  }, [clearChatState]);
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
      console.log("khallas");
      socket.emit("disconnect");
      socket.off(); // turn off the current connection instance.
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (fulldata) => {
      setMessages([...messages, fulldata]);
      addMessToArr(fulldata);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
        addMessage("");
      });

      console.log("message = " + message);
    }
  };

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
    clearChatState: () => dispatch(clearState()),
  };
};

export default connect(null, mapDispatchToProps)(Chat);
