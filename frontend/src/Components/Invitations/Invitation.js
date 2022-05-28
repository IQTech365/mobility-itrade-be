import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Invitations.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import InfoIcon from "@material-ui/icons/Info";
import history from "../../Utils/History";
import Notifications from "../Notifications/Notification";
import Popup from "../Helpers/Popups/Popup";
import { useSelector } from "react-redux";
import UserProfile from "../UserPorfile/UserProfile";

export default function Invitation(props) {
  const [data, setData] = useState(props.data);
  const [show, setshow] = useState(false);
  const [MainCode, setmaincode] = useState("");
  const Auth = useSelector(state => state.Auth)
  const [showPopup, toggleShowPopup] = useState(false);
  const [useiinfopopup, setuserInfopopup] = useState(false);
  useEffect(async () => {
    console.log(props.data);
    let datacpy = [...props.data];

    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }

  return (
    <Grid container spacing={0} className="mb-100">
      <Popup
        component={UserProfile}
        setuserInfopopup={setuserInfopopup}
        toggleShowPopup={setuserInfopopup}
        showPopup={useiinfopopup}
        url={"MyEvents/add-event"}
      />
      <Popup
        component={Notifications}
        setuserInfopopup={setshow}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={MainCode}
        showinvitaions={true}

      />
      {data.map((inv, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          className="InvitationCard"
          key={"InvitationCard" + index}
        >
          {inv[0].filetype === "png" || inv[0].filetype === "jpg" || inv[0].filetype === "jpeg" ? (<img
            src={inv[0].file}
            className="inv-img"
            onClick={() => {
              console.log(Auth.Name)
              Auth.Name == "" || Auth.Name == undefined ?
                setuserInfopopup(true)
                :
                history.push("/inv/eventpage/" + index);
            }}
          />) : (
            <video
              muted
              type="video/mp4"
              autoPlay={true}
              src={
                inv[0].file
              }
              onClick={() => {
                console.log(Auth.Name)
                Auth.Name == "" || Auth.Name == undefined ?
                  setuserInfopopup(true)
                  :
                  history.push("/inv/eventpage/" + index);
              }}
              preload="none"
              className='w-100 inv-img'
            />
          )}

          <NotificationsNoneIcon
            className="card-button Notifyme t-white"
            onClick={async () => {
              if (Auth.Name !== "" || Auth.Name !== undefined) {
                await setmaincode(inv[0].MainCode)
                await setshow(true)
              } else {
                setuserInfopopup(true)
              }
            }}
          />
          <div className="bottom-bar">
            <Grid container spacing={0}>
              <Grid item xs={9}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white">
                    {inv[0].Name}
                  </Grid>
                  <Grid item xs={12} className="fs-small t-white ">
                    {inv[0].Date} {inv[0].Time}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <button
                  className="card-button rsvp-button "
                  onClick={(e) => {
                    console.log(Auth.Name)
                    Auth.Name == "" || Auth.Name == undefined ?
                      setuserInfopopup(true)
                      :
                      history.push("/inv/rsvp/" + index);
                    e.preventDefault();
                  }}
                >
                  RSVP
                </button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
