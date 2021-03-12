import React from "react";
import { auth, provider } from "../../firebase";
import "./login.styles.css";
import chat from "../../assets/images/chat.png";

const LoginPage = () => {
  const login = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="formclass sign-in-form">
            <h2 className="title">Welcome to Chat-App</h2>
            <input
              type="submit"
              onClick={login}
              value="Login with Google"
              className="btn solid"
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <img src={chat} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
