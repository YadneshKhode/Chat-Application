import React from "react";
import { Avatar } from "@material-ui/core";
import SidebarChat from "../sidebar-chat/sidebarchat.component";
import { connect } from "react-redux";

//displays the sidebar with users online and current user's name and profile picture
const Sidebar = (props) => {
  const { photo, displayName, usersList } = props;
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={photo} alt="profile-pic" />
        <div className="sidebar__headerRight">
          <h1 className="displayName">{displayName}</h1>
        </div>
      </div>
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
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    photo: state.user.user.photo,
    displayName: state.user.user.displayName,
    usersList: state.chat.usersList,
  };
};

export default connect(mapStateToProps)(Sidebar);
