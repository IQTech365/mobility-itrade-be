import React, { useState, useEffect } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getuserdata } from "../../../Redux/DispatchFuncitons/AuthFunctions";
import { url } from "../../../Utils/Config";
import { Grid } from "@material-ui/core";
export default function UserData(props) {
  const [User, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.Phone);
    if (props.Phone !== "") {
      axios
        .post(url + "auth/getuserdetails", { Phone: props.Phone })
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);

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
    <div className="w-100">
      {props.showIcon === true ? (
        User.Pic !== undefined && User.Pic !== "" ? (
          <div className="fl">
            <Avatar alt="Profile Picture" src={User.Pic} />
          </div>
        ) : (
          <div className="fl">
            <AccountCircle />
          </div>
        )
      ) : (
        <></>
      )}
      {props.showName === true ? (
        <div className="fl  fs-bold ">{User.Name} </div>
      ) : (
        <></>
      )}
    </div>
  );
}
