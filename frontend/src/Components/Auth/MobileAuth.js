import React, { useState } from "react";
// import firebase from "../../Utils/Firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function MobileAuth() {
  const [number, setnumber] = useState(0);

  return (
    <div>
      <div id="recaptcha-container"></div>
      <form>
        <PhoneInput
          country={"in"}
          value={number}
          onChange={(phone) => setnumber(phone)}
        />

        <button className="get-otp-button">Try Now</button>
      </form>
    </div>
  );
}
