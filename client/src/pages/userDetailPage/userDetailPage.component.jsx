import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../index.css";
import { connect } from "react-redux";
import { addUser, addRoom } from "../../redux/chats/chats.action";

const UserDetails = (props) => {
  const { username, addUserName, addRoomName } = props;
  const [room, setRoom] = useState("");
  const saveUserNameAndRoom = () => {
    addUserName(username);
    addRoomName(room);
  };

  return (
    <div className="centered-form">
      <div className="centered-form__box">
        <h1 className="centered-form__title">Enter Room Name</h1>
        <form>
          <input
            className="centered-form__input"
            type="text"
            placeholder="Room"
            onChange={(event) => setRoom(event.target.value)}
            required
          />
          <Link
            onClick={(e) => (!username || !room ? e.preventDefault() : null)}
            to="/chat"
          >
            <button
              className="centered-form__button"
              type="submit"
              onClick={saveUserNameAndRoom}
            >
              Join
            </button>
          </Link>
        </form>
      </div>
      <h1 className="information"> If using mobile use Mozilla Firefox </h1>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.user.user.displayName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserName: (name) => dispatch(addUser(name)),
    addRoomName: (room) => dispatch(addRoom(room)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
