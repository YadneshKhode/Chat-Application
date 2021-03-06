import React, { useState } from "react";
import { auth, provider } from "../../firebase";
import "./login.styles.css";
import log from "../../assets/images/log.svg";
import register from "../../assets/images/register.svg";
const LoginPage = () => {
  const [addClass, setClass] = useState(false);
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  let toggle = () => {
    setClass(!addClass);
  };
  const login = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className={`container ${addClass ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="formclass sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              {/* <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a> */}
              <button onClick={login} className="social-icon">
                <i className="fab fa-google"></i>
              </button>
            </div>
          </form>
          <form action="#" className="sign-up-form formclass">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              {/* <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a> */}
              <button onClick={login} className="social-icon">
                <i className="fab fa-google"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={toggle}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={toggle}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
