import React from 'react';
import "../BlankPages/blankpage.css";
import blankfeed from "../../Assets/blankfeed.svg"

class FeedBlack extends React.Component {
    render() {
        return(
            <section className="blank_page_area">
<div className="container flex">
<div className="error_content text-center">
  <img src={blankfeed} alt="" />
  <h2>Let's start building the event</h2>
  
  
</div>
</div>
</section>
        )
    }
}

export default FeedBlack;