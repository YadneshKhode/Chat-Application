import { IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "../input/input.component";
import ChatMessage from "./chat-message.component";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import InfoBar from "../infoBar/infobar.component";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { logout } from "../../redux/user/user.action";
import { auth } from "../../firebase";
import GroupIcon from "@material-ui/icons/Group";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {
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
    email,
    username,
    room,
  } = props;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState([]);
  // const ENDPOINT = "http://localhost:5000";
  // const ENDPOINT = "https://yadnesh-chat-application.herokuapp.com/";
  let ENDPOINT;
  if (process.env.NODE_ENV === "development") {
    ENDPOINT = "http://localhost:5000";
  } else {
    ENDPOINT = process.env.REACT_APP_ENDPOINT;
  }

  // state is cleared when component is loaded first time or removed
  // useEffect(() => {
  //   clearChatState();
  // }, [clearChatState]);

  useEffect(() => {
    //getting values from URL and storing to redux state

    //passing domain to "io"
    socket = io(ENDPOINT);
    // //setting state
    // setName(userName);
    // //dispatching action
    // addUserName(username);
    // //setting state
    // setRoom(roomName);
    // //dispatching action
    // addRoomName(room);

    // Transmitting the object " { username, room, displayPhoto,e mail }" as soon as someone joins the room
    //The join keyword is reserved in socket.io and is executed whenever a new connection is made
    //"(error)=>" is a callback function triggered from the server ( server calls this function )
    socket.emit("join", { username, room, displayPhoto, email }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.off("join"); // turn off the current connection instance.
    };
  }, [ENDPOINT, addRoomName, room, username, addUserName, displayPhoto, email]);

  //Receiver for the message emitted by the server
  useEffect(() => {
    socket.on("message", (fulldata) => {
      //adding data to existing array of messages
      setMessages([...messages, fulldata]);
      //dispatching action to update redux state of messages
      addMessToArr(fulldata);
    });
    return () => {
      socket.off("message");
    };
  }, [messages, addMessToArr, addToUsers]);
  useEffect(() => {
    //Receiver for room-data sent from server this function is executed whenever a new connection joins the room or leaves the room
    socket.on("roomData", ({ users }) => {
      //dispatching action to updaqte redux state
      addToUsers(users);
    });
    return () => {
      socket.off("roomData");
    };
  });
  //Transmitter for sending messages to server
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        //setting state
        setMessage("");
        //dispatching action
        addMessage("");
      });
    }
  };

  const signMeOut = () => {
    //dispatching action to clear user object in redux
    logout();
    clearChatState();
    auth.signOut();
    //Method provided by firebase to log out the user
  };

  const toggleMe = () => {
    //used to show / hide list of current active users in mobile view
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  // const leaveRoom = () => {
  //   socket.emit("leftRoom", room, username);
  // };
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
              <Link to="/room"  className="exit__button">
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
    email: state.user.user.email,
    username: state.chat.username,
    room: state.chat.room,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
