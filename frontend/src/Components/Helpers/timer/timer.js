import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

export default function Timer(props) {
  const [datetimer, setdatetime] = useState(Date.now() + 60000);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      props.settodo(1);
      return <></>;
    } else {
      // Render a countdown
      return (
        <>
          OTP will expire in : {hours}:{minutes}:{seconds}
        </>
      );
    }
  };
  return <Countdown date={datetimer} renderer={renderer} />;
}
