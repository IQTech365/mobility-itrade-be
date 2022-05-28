import React from "react";
import "../BlankPages/blankpage.css";
import chatempty from "../../Assets/chatempty.svg";

class ChatBlank extends React.Component {
  render() {
    return (
      <section className="blank_page_area">
        <div className="container flex">
          <div className="error_content text-center">
            <img src={chatempty} alt="" />
            <h2>Let's Start Chatting</h2>
            <p>How about starting your first chat with your friends ?</p>
          </div>
        </div>
      </section>
    );
  }
}

export default ChatBlank;
