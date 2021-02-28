import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import { connect } from "react-redux";

const InfoBar = (props) => {
  const { room, messages } = props;
  let lastCreatedAt;
  messages.length > 0
    ? (lastCreatedAt = messages[messages.length - 1].createdAt)
    : (lastCreatedAt = "");

  return (
    <div className="chat__headerInfo">
      <h3>
        {room} &nbsp;
        <img className="onlineIcon" src={onlineIcon} alt="online icon " />
      </h3>
      <p>{lastCreatedAt}</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    room: state.chat.room,
    messages: state.chat.messages,
  };
};
export default connect(mapStateToProps)(InfoBar);
