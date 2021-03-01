import React from "react";
import "./sidebar.style.css";
import { Avatar, IconButton } from "@material-ui/core";
// import ChatIcon from "@material-ui/icons/Chat";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SidebarChat from "../sidebar-chat/sidebarchat.component";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu9aFRQkhjsIHTP2JL8BIF3XnSl-iYxhU3buS1PzdQ=s32-c-mo" />
        <div className="sidebar__headerRight">
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          {/* <IconButton>
            <ChatIcon />
          </IconButton> */}
          {/* <IconButton>
            <MoreVertIcon />
          </IconButton> */}
        </div>
      </div>
      {/* <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div> */}
      <div className="sidebar__chats">
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
