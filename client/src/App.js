import "./App.css";
import Chatpage from "./pages/chatpage/chatpage.component";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserDetails from "./pages/userDetailPage/userDetailPage.component";
import LoginPage from "./pages/loginpage/login.component";
import { connect } from "react-redux";
import { auth } from "./firebase";
import { login, logout } from "./redux/user/user.action";
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
  }, []);

  return (
    <div>
      <Router>
        <Route exact path="/room" component={UserDetails} />
        <Route path="/chat" component={Chatpage} />
        {/* <Route exact path="/" component={LoginPage} /> */}
        <Route
          exact
          path="/"
          render={() => (user ? <Redirect to="/room" /> : <LoginPage />)}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Chatpage
// 	Sidebar
// 		SidebarChat
// 	Chat
// 		Infobar
// 		Input
// 		ChatMessage
