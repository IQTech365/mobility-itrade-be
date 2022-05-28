import React from "react";
import "../BlankPages/blankpage.css";
import Error from "../../Assets/error.png";

class NullPage extends React.Component {
  render() {
    return (
      <>
        <section className="blank_page_area">
          <div className="container flex">
            <div className="error_content text-center">
              <img src={Error} alt="" />
              <h2>Error. We can’t find the page you’re looking for.</h2>
              <p>Sorry for the inconvenience. Go to our homepage</p>
              <br />
              <a href="/" className="about_btn btn_hover">
                Back to Home Page <i className="arrow_right"></i>
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default NullPage;
