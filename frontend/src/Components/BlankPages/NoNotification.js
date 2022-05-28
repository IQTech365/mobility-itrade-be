import React from 'react';
import "../BlankPages/blankpage.css";
import NoNotif from "../../Assets/NoNotif.svg";

class NoNotification extends React.Component {
    render() {
        return (
<section className="blank_page_area">
<div className="container flex">
<div className="error_content text-center">
  <img src={NoNotif} alt="" />
  <h2>No Notification</h2>
  
  
</div>
</div>
</section>
        
        )
    }
}

export default NoNotification;