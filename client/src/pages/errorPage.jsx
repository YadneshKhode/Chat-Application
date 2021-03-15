import React from "react";
import errorPage from "../assets/images/404error.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearState } from "../redux/chats/chats.action";
import { logout } from "../redux/user/user.action";
import { auth } from "../firebase";

const ErrorPage = (props) => {
  const { clearChatState, logout } = props;
  const signMeOut = () => {
    //dispatching action to clear user object in redux
    clearChatState();

    logout();
    //Method provided by firebase to log out the user
    auth.signOut();
  };
  return (
    <div>
      <img
        className="errorPage"
        src={errorPage}
        alt="Error 404 Page Not Found"
      />
      <Link className="errorPage__link" to="/">
        <button onClick={signMeOut}>Go To Login Page</button>
      </Link>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearChatState: () => dispatch(clearState()),
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(ErrorPage);
