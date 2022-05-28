import React, { useState, useEffect } from "react";
import "./styles.css";
import PictureIcon from "../../Assets/PictureIcon.png"
import EngageIcon from "../../Assets/EngageIcon.png"
import AlbumsIcon from "../../Assets/AlbumsIcon.png"
import CustomIcon from "../../Assets/CustomIcon.png"
import PrivateIcon from "../../Assets/PrivateIcon.png"
import InviteIcon from "../../Assets/InviteIcon.png"
import EasyIcon from "../../Assets/EasyIcon.png"
import DestinIcon from "../../Assets/DestinIcon.png"
import MobilePro from "../../Assets/MobilePro.png"
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import history from "../../Utils/History";
import { loginuser } from "../../Redux/DispatchFuncitons/AuthFunctions";
import LoginSignup from "../Auth/LoginSignup";

export default function Additionals() {
  const [showPopup, toggleShowPopup] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="additional_part py-75">
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12 mb-4">
                <h2 className="font-weight-bold text-color text-left mb-0">
                  Additionals
                </h2>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={PictureIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Pictures and Videos</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={EngageIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Engagement</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={AlbumsIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Albums</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={CustomIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Customize</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={PrivateIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Private / Secure</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={InviteIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Invite at GO</p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={EasyIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">
                    Easy to create in 5 Minutes
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-3 col-6">
                <div className="addition_item">
                  <img
                    src={DestinIcon}
                    alt="img"
                    className="img-fluid"
                  />
                  <p className="text-color mt-2 mb-2">Destination Event</p>
                </div>
              </div>
              <div className="col-md-12 text-left">
                <button className="addition_btn" onClick={() => {
                  toggleShowPopup(true);
                }}>Create an Invite</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="Additionals_img">
              <img
                src={MobilePro}
                className="img-fluid"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


