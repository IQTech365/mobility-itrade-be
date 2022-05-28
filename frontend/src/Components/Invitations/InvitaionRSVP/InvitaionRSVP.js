import React, { useState } from "react";
import Header from "../../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import "./InvitaionRSVP.css";
import { Carousel, Button } from "react-bootstrap";

import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import { rsvp_event, GetInvitations, GetEvents } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import history from "../../../Utils/History";
import NavMobile from "../../Helpers/NavMobile/NavMobile";
import DesktopNav from "../../Helpers/DesktopNav/DesktopNav";
import Toggler from "../../Helpers/EventInvitoggler/Toggler";
import { getNotification } from '../../../Redux/DispatchFuncitons/NotificationFunctions'
export default function InvitaionRSVP(props) {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);

  const Next = async (i) => {
    console.log(i, props.Eventdata.length);
    if (i < props.Eventdata.length) {
      props.setevno(i);
      setindex(i);
      setdirection("next");
    } else {
      props.sethasallrsvps(true);
      await dispatch(GetInvitations());
      await dispatch(GetEvents());
      await dispatch(getNotification())
    }
  };

  const [index, setindex] = useState(0);
  const [direction, setdirection] = useState("");

  const handleSelect = (index) => {
    let newIndex = index + 1;
  };

  return (
    <>
      <div className="desktop-only w-100" >
        <Header className="desktop-only" />
      </div>
      <DesktopNav id={props.id} base={props.base} />
      <Toggler id={props.id} />
      <Carousel
        controls={false}
        direction={direction}
        onSelect={(i) => {
          handleSelect(i);
        }}
        activeIndex={index}
        interval={99999999999999}
      >
        {props.Eventdata && props.Eventdata.length > 0 &&
          props.Eventdata.map((eve, index) => (
            <Carousel.Item>
              <img
                className="d-block fullimage"
                src={eve.file}
                alt="First slide"
              />
              <div className="rsvp-buttons">
                <center>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(rsvp_event(eve._id, "Accept", Auth.Phone));
                      Next(index + 1);
                    }}
                  >
                    <CheckIcon />
                    Accept
                  </Button>
                  <Button
                    className="btn-weddingmain"
                    onClick={async () => {
                      await dispatch(rsvp_event(eve._id, "May Be", Auth.Phone));
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
      {/* <NavMobile className="footnavmobile" id={props.id} base={props.base} /> */}
    </>
  );
}
