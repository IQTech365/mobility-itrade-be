import {
  LOGINSUCCESS,
  LOGINFAIL,
  GOTOTP,
  OPTEXPIRED,
  OTPVERIFIED,
  SAVEUSER,
  LOGOUT,
} from "../Actions/AuthActions";
import setAuthToken from "../../Utils/Login";
import axios from "axios";
import { url, testmode } from "../../Utils/Config";
import jwt_decode from "jwt-decode";
import history from "../../Utils/History";
export function getopt(Phone) {
  return (dispatch) => {
    const userData = {
      Phone,
    };
    if (Phone !== "") {
      if (testmode === true) {
        dispatch(loginuser(Phone))
      } else {
        axios.post(url + "auth/send-otp", userData).then((res) => {
          console.log(res);
          if (res.data.status === "pending") {
            dispatch({
              type: GOTOTP,
            });
          } else {
          }
        });
      }

    }
  };
}
export function verifyotp(Phone, code) {
  return async (dispatch) => {
    if (code !== "") {
      await axios
        .post(url + "auth/verify-otp", { Phone, code })
        .then(async (res) => {
          await console.log(res);
          if (
            res.data.status === "checked" &&
            res.data.response === "approved"
          ) {
            console.log(res.data.data);
            dispatch({
              type: OTPVERIFIED,
            });
          } else {
            dispatch({
              type: OPTEXPIRED,
            });
          }
        });
    }
  };
}
export function loginuser(Phone) {
  return (dispatch) => {
    const userData = {
      Phone,
    };
    if (Phone !== "") {
      axios
        .post(url + "auth/login", userData)
        .then((res) => {
          if (res.data.token) {
            const token = res.data.token;
            const decoded = jwt_decode(token);
            setAuthToken(token);
            //checkfor codeed Events
            dispatch({
              type: LOGINSUCCESS,
              payload: res.data,
            });
            // history.push("/home");
            return "loggedin";
          } else if (res.data.status === "-1") {
            dispatch({
              type: LOGINFAIL,
              payload: res.data.message,
            });
          } else if (res.data.details[0].message) {
            dispatch({
              type: LOGINFAIL,
              payload: res.data.details[0].message,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Auth falied");
    }
  };
}
export function logout(Phone) {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
    history.push("/");
  };
}
export function saveuserinfo(Name, Gender, DOB, Image, nurl) {
  return (dispatch) => {
    console.log("/" + nurl);
    const userData = {
      Name: Name,
      Gender: Gender,
      DOB: DOB,
      Image: Image,
    };
    if (Name !== "" && Gender !== "") {
      axios
        .post(url + "auth/userinfo", userData)
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);
            dispatch({
              type: SAVEUSER,
              payload: res.data.user,
            });
            if (nurl !== "") {
              history.push("/" + nurl);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };
}
export function getuserdata(Phone) {
  const userData = {
    Phone: Phone,
  };
  if (Phone !== "") {
    axios
      .get(url + "auth/userinfo", userData)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data.user);
          return res.data.user;
        }
      })
      .catch((err) => {
        console.log(err);
        return { err: "error 404" };
      });
  }
}
export function checktoken() {
  return (dispatch) => {
    axios
      .get(url + "auth/verify")
      .then((res) => {
        if (res.data.status !== "valid") {
          dispatch({
            type: LOGOUT,
          });
          history.push("");
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT,
        });
      });
  };
}
