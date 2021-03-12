import { IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import Input from "../input/input.component";
import ChatMessage from "./chat-message.component";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import queryString from "query-string";
import InfoBar from "../infoBar/infobar.component";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { logout } from "../../redux/user/user.action";
import { auth } from "../../firebase";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {
  addUser,
  addRoom,
  addCurrentMessage,
  addToMessages,
  clearState,
  addToUsers,
} from "../../redux/chats/chats.action";
import { connect } from "react-redux";
import SidebarChat from "../sidebar-chat/sidebarchat.component";

let socket;

const Chat = React.memo((props) => {
  const {
    addUserName,
    addRoomName,
    addMessage,
    addMessToArr,
    clearChatState,
    logout,
    addToUsers,
    displayPhoto,
    usersList,
  } = props;
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState([]);
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
    socket.emit("join", { username, room, displayPhoto }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.off("join"); // turn off the current connection instance.
    };
  }, [ENDPOINT, location.search, addRoomName, addUserName, displayPhoto]);

  useEffect(() => {
    socket.on("message", (fulldata) => {
      setMessages([...messages, fulldata]);
      addMessToArr(fulldata);
    });
    return () => {
      socket.off("message");
    };
  }, [messages, addMessToArr, addToUsers]);
  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      addToUsers(users);
    });
    return () => {
      socket.off("roomData");
    };
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
        addMessage("");
      });
    }
  };

  const signMeOut = () => {
    logout();
    auth.signOut();
  };

  const toggleMe = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <GroupIcon className="groupIcon" />
        <InfoBar room={room} />
        <div className="chat__headerRight">
          <IconButton>
            <div className="tooltip">
              <FormatListBulletedIcon
                className="white memberIcon"
                onClick={toggleMe}
              />
              <span className="tooltiptext">Group Members</span>
            </div>
          </IconButton>
          <IconButton>
            <div className="tooltip">
              <Link to="/room" className="exit__button">
                <CancelRoundedIcon className="white" />
              </Link>
              <span className="tooltiptext">Exit Chat Room</span>
            </div>
          </IconButton>
          <IconButton>
            <div className="tooltip">
              <Link to="/" className="logout__button" onClick={signMeOut}>
                <span className="tooltiptext">Log out</span>
                <ExitToAppIcon className="white" />
              </Link>
            </div>
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {toggle ? (
          <ChatMessage username={username} messages={messages} />
        ) : (
          <>
            <div className="sidebar__search">
              <h4 className="userList">Users currently online</h4>
            </div>
            <div className="sidebar__chats">
              {usersList ? (
                usersList.map((user, i) => (
                  <div key={i}>
                    <SidebarChat
                      username={user.username}
                      displayPhoto={user.displayPhoto}
                    />
                  </div>
                ))
              ) : (
                <SidebarChat />
              )}
            </div>
          </>
        )}
      </div>
      <div className="chat__footer">
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
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
    logout: () => dispatch(logout()),
    addToUsers: (name) => dispatch(addToUsers(name)),
  };
};

const mapStateToProps = (state) => {
  return {
    displayPhoto: state.user.user.photo,
    photo: state.user.user.photo,
    displayName: state.user.user.displayName,
    usersList: state.chat.usersList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
