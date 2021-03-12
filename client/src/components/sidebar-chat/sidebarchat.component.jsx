import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebarchat.style.css";

const SidebarChat = (props) => {
  const { username, displayPhoto } = props;

  return (
    <div className="sidebarChat">
      <Avatar src={displayPhoto} alt="profile-pic" />
      <div className="sidebar__chatInfo">
        <h2>{username}</h2>
      </div>
    </div>
  );
};

export default SidebarChat;
