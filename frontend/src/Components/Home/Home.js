import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Helpers/Header/Header";
import FootMenu from "../Helpers/FootMenu/FootMenu";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitations/Invitation";
import EventList from "../Events/Eventlist";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { getposts } from "../../Redux/DispatchFuncitons/postfunctions";
import { getNotification } from "../../Redux/DispatchFuncitons/NotificationFunctions";
import { getChats } from "../../Redux/DispatchFuncitons/Chatgroupfunctions";
import { addme, deleteEvent } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Home(props) {
  const dispatch = useDispatch();
  const [Menu, setMenu] = useState(0);
  const CodeEvent = useSelector(state => state.CodeEvent)
  const EventState = useSelector((state) => state.Eventdata);
  useEffect(async () => {
    if (CodeEvent.Name !== "") {
      dispatch(addme(CodeEvent.Code, CodeEvent.Name));
      // dispatch(deleteEvent());
    }

    dispatch(GetEvents());
    dispatch(GetInvitations());
    dispatch(getNotification());
    dispatch(getChats());

    if (
      props.location.pathname === "/inv" ||
      props.location.pathname === "/" ||
      props.location.pathname === "/home"
    ) {
      await setMenu(0);
    } else {
      setMenu(1);
    }


  }, []);
  useEffect(async () => {
    const interval = setInterval(() => {
      dispatch(GetEvents());
      dispatch(GetInvitations());
      dispatch(getNotification());
      dispatch(getChats());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <><div className="desktop-only w-100" >
      <Header url={props.location.pathname} className="desktop-only" />
    </div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12}>
          {Menu === 0 ? (
            <Invitation data={EventState.myInvitations} className="w-100" />
          ) : (
            <EventList data={EventState.myEvents} className="w-100" />
          )}
        </Grid>
      </Grid>
      <FootMenu menu={Menu} setMenu={setMenu} />
    </>
  );
}
