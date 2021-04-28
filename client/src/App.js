import "./App.css";
import Chatpage from "./pages/chatpage/chatpage.component";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";
import UserDetails from "./pages/userDetailPage/userDetailPage.component";
import LoginPage from "./pages/loginpage/login.component";
import VideoCallPage from "./pages/videoCallPage/videoCallPage"
import { connect } from "react-redux";
import { auth } from "./firebase";
import { login, logout } from "./redux/user/user.action";
import ErrorPage from "./pages/errorPage";

function App(props) {
  const { user, login, logout } = props;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        });
      } else {
        logout();
      }
    });
  }, [login, logout]);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (user ? <Redirect to="/room" /> : <LoginPage />)}
          />
          <Route exact path="/room" component={UserDetails} />
          <Route exact path="/chat" component={Chatpage} />
          <Route exact path="/call" component={VideoCallPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//Chat - Application tree ( not 100% complete )
// Chatpage
// 	Sidebar
// 		SidebarChat
// 	Chat
// 		Infobar
// 		Input
// 		ChatMessage
