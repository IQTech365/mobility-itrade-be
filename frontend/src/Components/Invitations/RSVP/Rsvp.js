import React, { useState, useEffect } from "react";
import Header from "../../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
// import "../EventInfo/EventInfo.css";
import { Carousel, Button } from "react-bootstrap";
import eventimg from "../../../Assets/eventimg.png";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import { rsvp_event, GetInvitations, GetEvents } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import history from "../../../Utils/History";
import NavMobile from "../../Helpers/NavMobile/NavMobile";
import DesktopNav from "../../Helpers/DesktopNav/DesktopNav";
import Toggler from "../../Helpers/EventInvitoggler/Toggler";
import "./Rsvp.css";
import { getNotification } from '../../../Redux/DispatchFuncitons/NotificationFunctions'
export default function Rsvp(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [base, setbase] = useState("");
  const Eventdata1 = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );
  const Eventdata2 = useSelector(
    (state) => state.Eventdata.myEvents[props.match.params.id]
  );
  const [Eventdata, setEventdata] = useState([]);
  useEffect(async () => {
    if (props.location.pathname === "/MyEvents/rsvp/" + props.match.params.id) {
      await setbase("MyEvents");
      setEventdata(Eventdata2);
    } else {
      await setbase("inv");
      setEventdata(Eventdata1);
    }
  }, []);
  const Next = async (i) => {
    debugger;
    if (Eventdata && Eventdata.length > 0) {
      console.log(i, Eventdata.length);
      if (i < Eventdata.length) {
        setindex(i);
        setdirection("next");
      } else {
        await dispatch(GetInvitations());
        await dispatch(GetEvents());
        await dispatch(getNotification())
        history.goBack()
      }
    }

  };

  const [index, setindex] = useState(0);

  const [direction, setdirection] = useState("");

  const handleSelect = (index) => {
    let newIndex = index + 1;
  };

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <DesktopNav />
      <Toggler />
      <Carousel
        controls={false}
        direction={direction}
        onSelect={(i) => {
          handleSelect(i);
        }}
        activeIndex={index}
        interval={99999999999999}
      >
        {base === "inv"
          ? Eventdata1 &&
          Eventdata1.map((eve, index) => (
            <Carousel.Item>
              <img
                className="d-block rsvpimage"
                src={eve.file}
                alt="First slide"
              />
              <div className="rsvp-buttons">
                <center>
                  <Button
                    className="btn-weddingmain "
                    onClick={async () => {

                      await dispatch(
                        rsvp_event(eve._id, "Accept", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <CheckIcon />
                    Accept
                  </Button>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(
                        rsvp_event(eve._id, "May Be", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <ErrorIcon />
                    Maybe
                  </Button>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(
                        rsvp_event(eve._id, "Decline", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <CancelIcon />
                    Decline
                  </Button>
                </center>
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          ))
          : Eventdata2 &&
          Eventdata2.map((eve, index) => (
            <Carousel.Item>
              {eve.filetype === "png" || eve.filetype === "jpg" || eve.filetype === "jpeg" ? (
                <img
                  className="d-block rsvpimage"
                  src={eve.file}
                  alt="First slide"
                />) : (
                <video
                  muted
                  type="video/mp4"
                  autoPlay={true}
                  src={
                    eve.file
                  }
                  preload="none"
                  className="d-block rsvpimage"
                />
              )}

              <div className="rsvp-buttons">
                <center>
                  <Button
                    className="btn-weddingmain "
                    onClick={async () => {
                      await dispatch(
                        rsvp_event(eve._id, "Accept", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <CheckIcon />
                    Accept
                  </Button>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(
                        rsvp_event(eve._id, "May Be", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <ErrorIcon />
                    Maybe
                  </Button>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(
                        rsvp_event(eve._id, "Decline", Auth.Phone)
                      );
                      Next(index + 1);
                    }}
                  >
                    <CancelIcon />
                    Decline
                  </Button>
                </center>
              </div>
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
      {/* <NavMobile className="footnavmobile" base={base} id={props.match.params.id} /> */}
    </>
  );
}
