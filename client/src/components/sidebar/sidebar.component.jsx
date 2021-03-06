import React from "react";
import "./sidebar.style.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../sidebar-chat/sidebarchat.component";
import { connect } from "react-redux";
const Sidebar = (props) => {
  const { photo } = props;
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={photo} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    photo: state.user.user.photo,
  };
};

export default connect(mapStateToProps)(Sidebar);
