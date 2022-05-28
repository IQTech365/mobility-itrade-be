import React, { useState, useEffect } from "react";
import "./styles.css";
import PeopleIcon from "../../Assets/PeopleIcon.png"
import RSVPIcon from "../../Assets/RSVPIcon.png"
import LocationIcon from "../../Assets/LocationIcon.png"
import MobileIcon from "../../Assets/MobileIcon.png"
import { Container } from "react-bootstrap"
import LoginSignup from "../Auth/LoginSignup";
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
export default function Features() {
  const [showPopup, toggleShowPopup] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="container" style={{ marginTop: 25 }}>
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
      <div className="row">
        <div className="col-md-12 mb-4">
          <h2 className="font-weight-bold text-color text-center mb-0 our_feature">
            Our Features
          </h2>
        </div>
        <div className="col-md-3 col-6">
          <div className="feature_item">
            <img
              src={MobileIcon}
              alt="img"
              className="img-fluid"
              style={{ height: 'auto' }}
            />
            <p className="text-color mt-3 mb-0 text-center">No App Required</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="feature_item">
            <img
              src={PeopleIcon}
              alt="img"
              className="img-fluid"
              style={{ height: 'auto' }}
            />
            <p className="text-color mt-3 mb-0 text-center">Unlimited Guests</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="feature_item">
            <img
              src={RSVPIcon}
              alt="img"
              className="img-fluid"
              style={{ height: 'auto' }}
            />
            <p className="text-color mt-3 mb-0 text-center">RSVP</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="feature_item">
            <img
              src={LocationIcon}
              alt="img"
              className="img-fluid"
              style={{ height: 'auto' }}
            />
            <p className="text-color mt-3 mb-0 text-center">Schedule Location</p>
          </div>
        </div>
        <div className="col-md-12 text-center mt-5">
          <button className="feature_btn" onClick={() => {
            toggleShowPopup(true);
          }}>Create an Invite</button>
        </div>
      </div>
    </div>
  )
}


