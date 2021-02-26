import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebarchat.style.css";
import { connect } from "react-redux";

const SidebarChat = (props) => {
  const { room, messages } = props;
  const lastMessage = messages[messages.length - 1].message;
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebar__chatInfo">
        <h2>{room}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    room: state.chat.room,
    messages: state.chat.messages,  
  };
};

export default connect(mapStateToProps)(SidebarChat);
