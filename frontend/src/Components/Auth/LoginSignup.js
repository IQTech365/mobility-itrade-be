import React, { useState, useEffect } from "react";
import Login from "../../Assets/Auth.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { Grid } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import OtpInput from "react-otp-input";
import Timer from "../Helpers/timer/timer";
import {
  loginuser,
  getopt,
  verifyotp,
} from "../../Redux/DispatchFuncitons/AuthFunctions";
import { Row, Col } from "react-bootstrap";
import history from '../../Utils/History'
export default function LoginSignup() {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [todo, settodo] = useState(0);
  const [step, setStep] = useState(0);
  const [number, setnumber] = useState(0);

  const [error, setError] = useState("");
  const [OTP, SetOPT] = useState();
  const [Phone, setPhone] = useState("");
  let phone = "";
  const handleClick = (e) => {
    phone = "+" + number.toString();
    if (phone.length < 9) {
      setError("Invalid Phone Number");
    } else {
      dispatch(getopt(phone));
      setPhone(phone);
      setStep(1);
    }
  };

  const handleCheck = () => {
    dispatch(verifyotp(Phone, OTP));
  };
  useEffect(() => {
    if (Auth.isLoggedIn === true) {
      history.push("/home");
    }
  }, [Auth.isLoggedIn])

  useEffect(() => {
    if (Auth.OTPStatus === true) {
      if (Auth.isVerified === true) {
        dispatch(loginuser(Phone));
      } else if (Auth.isVerified === false) {
        // setStep(1);
      } else {
        setError("please check the input");
      }
    }
  }, [Auth.isVerified, Auth.OTPStatus]);

  if (step === 0) {
    return (
      <div>
        <div id="sign-in-button"></div>
        <img src={Login} alt="login" className="Auth-image" />
        <Grid container spacing={0}>
          <Grid item xs={12} className="modal-title">
            Login
            <p className="modal-title-description">
              Enter your Mobile Number and Verify to login
            </p>
            <p className="phno-text" style={{ fontSize: 17, marginTop: 24 }}>
              {" "}
              Phone Number
            </p>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <PhoneInput
              country={"in"}
              value={number}
              onChange={(phone) => setnumber(phone)}
            />
            <p className="error">{Auth.Message || error}</p>

            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="get-otp-button"
            >
              Request OTP
            </button>
          </Grid>
        </Grid>
      </div>
    );
  } else if (step === 1) {
    return (
      <div>
        <div id="recaptcha-container" size="invisible"></div>
        <img src={Login} alt="login" className="Auth-image" />
        <Grid container spacing={0}>
          <Grid item xs={12} className="modal-title">
            Authorized OTP
            <p className="modal-title-description">
              Enter the code you recieved on your number
            </p>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <span style={{ fontSize: 13, color: "#727272" }}>
              Enter One Time Password (OTP)
            </span>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <OtpInput
              className="OTP"
              value={OTP}
              onChange={(otp) => SetOPT(otp)}
              numInputs={6}
              separator={<span></span>}
              inputStyle="Otp-block"
              isInputNum={true}
            />
            <p className="error">{Auth.Message}</p>
            <Row style={{ margin: "auto" }}>
              <Col>
                <button
                  onClick={(e) => {
                    handleCheck();
                  }}
                  className={todo ? "resend-otp" : "get-otp-button"}
                >
                  Verify
                </button>
              </Col>
              <Col>
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className={todo ? "get-otp-button" : "resend-otp"}
                >
                  Resend OTP
                </button>
              </Col>
            </Row>

            <p
              className="label w-100 tac"
              style={{ marginTop: 10, color: "#727272" }}
            >
              <Timer setStep={setStep} settodo={settodo} />
            </p>
          </Grid>
          <p style={{ fontSize: 9, color: "#727272" }}>
            By Continuing ,you agree to Mobillyinvite's{" "}
            <b style={{ color: "black" }}>
              Terms {"&"} Conditions, Privacy policy
            </b>{" "}
            and receving updated through WhatsAPP.
          </p>
        </Grid>
      </div>
    );
  }
}
