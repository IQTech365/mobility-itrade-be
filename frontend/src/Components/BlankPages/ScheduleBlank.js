import React from 'react';
import "../BlankPages/blankpage.css";
import blankschedule from "../../Assets/blankschedule.svg"

class ScheduleBlank extends React.Component {
    render() {
        return(
            <section className="blank_page_area">
<div className="container flex">
<div className="error_content text-center">
  <img src={blankschedule} alt="" />
  <h2>Oops! No Schedule</h2>
  
  
</div>
</div>
</section>
        
        )
    }
}

export default ScheduleBlank;