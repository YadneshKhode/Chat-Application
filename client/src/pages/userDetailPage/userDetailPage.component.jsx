import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../index.css"

const UserDetails = () => {
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="centered-form">
      <div className="centered-form__box">
        <h1 className="centered-form__title">Enter Details</h1>
        <form>
          <label className="centered-form__label">Display Name</label>
          <input
            className="centered-form__input"
            placeholder="Display Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label className="centered-form__label">Room</label>
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

export default UserDetails;
