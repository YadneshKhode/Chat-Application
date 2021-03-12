import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../index.css";
import { connect } from "react-redux";
const UserDetails = (props) => {
  const { username } = props;
  const [room, setRoom] = useState("");
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
            to={`/chat?username=${username}&room=${room}`}
          >
            <button className="centered-form__button" type="submit">
              Join
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.user.user.displayName,
  };
};
export default connect(mapStateToProps)(UserDetails);
