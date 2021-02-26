import "./App.css";
import Chatpage from "./pages/chatpage/chatpage.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserDetails from "./pages/userDetailPage/userDetailPage.component";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={UserDetails} />
        <Route path="/chat" component={Chatpage} />
      </Router>
    </div>
  );
}

export default App;

// Chatpage
// 	Sidebar
// 		SidebarChat
// 	Chat
// 		Infobar
// 		Input
// 		ChatMessage
