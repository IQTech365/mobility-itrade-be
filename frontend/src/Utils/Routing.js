import React, { useEffect } from "react";
import history from "./History";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { loginuser } from "../Redux/DispatchFuncitons/AuthFunctions";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GetEvents,
  GetInvitations,
} from "../Redux/DispatchFuncitons/Eventfunctions";
import { getposts } from "../Redux/DispatchFuncitons/postfunctions";
import { getNotification } from "../Redux/DispatchFuncitons/NotificationFunctions";
import { getChats } from "../Redux/DispatchFuncitons/Chatgroupfunctions";
export default function Redirector() {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  useEffect(async () => {
    debugger

    let ischeck = await reactLocalStorage.get("isLoggedIn");
    let Phone = await reactLocalStorage.get("Phone");
    let Token = reactLocalStorage.get("Token", true);
    if (ischeck === "false" || ischeck === undefined || ischeck === "") {
      console.log("logout");
      history.push("/");
    } else {
      console.log("loginuser");
      await dispatch(loginuser(Phone));
    }
  }, [])
  useEffect(async () => {
    if (Auth.isLoggedIn === true) {
      debugger
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
      await dispatch(getNotification());
      await dispatch(getposts());
      await dispatch(getChats());
      //  await history.goBack();
    }
  }, [Auth.isLoggedIn])
  return <div><CircularProgress style={{ width: '6vw', position: 'fixed', top: '45vh', left: '47vw' }} /></div>;
}
