import React, { useState, useEffect } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getuserdata } from "../../../Redux/DispatchFuncitons/AuthFunctions";
import { url } from "../../../Utils/Config";
import { Grid } from "@material-ui/core";
export default function UserDataUrl(props) {
  const [User, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.Phone !== "") {
      axios
        .post(url + "auth/getuserdetails", { Phone: props.Phone })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    }
  }, []);
  useEffect(() => {
    if (props.Phone !== "") {
      axios
        .post(url + "auth/getuserdetails", { Phone: props.Phone })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    }
  }, [props.Phone]);
  return (
    <>
      {props.showIcon === true ? (
        User.Pic !== undefined && User.Pic !== "" ? (
          <Avatar alt="Profile Picture" src={User.Pic} />
        ) : (
          <AccountCircle style={{ height: "40px", width: "40px" }} />
        )
      ) : (
        <></>
      )}
      {props.showName && props.showName === true ? (
        <span className="name">
          {User.Name === undefined || User.Name === ""
            ? props.Phone
            : User.Name}
        </span>
      ) : (
        <span className="name"></span>
      )}
    </>
  );
}
