import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Eventlist.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Notifications from "../Notifications/Notification";
import Popup from "../Helpers/Popups/Popup";
import history from "../../Utils/History";
export default function EventList(props) {
  const [show, setshow] = useState(false);
  const [MainCode, setmaincode] = useState("");

  const [data, setData] = useState(props.data);
  useEffect(async () => {
    console.log(props.data);
    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }
  return (
    <Grid container className="mb-100 contain-main">
      <Popup
        component={Notifications}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={MainCode}
        showinvitaions={true}
      // eventCode={eventCode}
      />
      {data.map((inv, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          className="InvitationCard"
          key={"invContainer" + index}


        >

          {inv[0].filetype === "png" || inv[0].filetype === "jpg" || inv[0].filetype === "jpeg" ? (<img
            src={inv[0].file}
            className="inv-img"
            onClick={() => {
              history.push("/MyEvents/eventpage/" + index);
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
                history.push("/MyEvents/eventpage/" + index);
              }}
              preload="none"
              className='w-100 inv-img'
            />
          )}
          <NotificationsNoneIcon
            className="card-button Notifyme t-white"
            onClick={async () => {
              await setmaincode(inv[0].MainCode);
              // await seteventcode(inv[index].eventCode);
              await setshow(true);
            }}
          />
          <div className="bottom-bar">
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white">
                    {inv[0].Name}
                  </Grid>
                  <Grid item xs={12} className="fs-small t-white ">
                    {inv[0].Date} {inv[0].Time}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </Grid>
      ))}

    </Grid>
  );
}
