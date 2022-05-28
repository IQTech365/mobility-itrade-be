import React from "react";
import "../BlankPages/blankpage.css";
import imgoffline from "../../Assets/imgoffline.svg";

class Offline extends React.Component {
  render() {
    return (
      <>
        <section className="blank_page_area">
          <div className="container flex">
            <div className="error_content text-center">
              <img src={imgoffline} alt="" />
              <h2>No Content Available Offline</h2>
              <p>
                Tap “Make available offline” in a file or folder’s menu to make
                it available when you are not connected to the internet
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Offline;
