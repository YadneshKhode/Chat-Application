import Chat from "../../components/chat/chat.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import React from "react";

const Chatpage = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Chatpage;
