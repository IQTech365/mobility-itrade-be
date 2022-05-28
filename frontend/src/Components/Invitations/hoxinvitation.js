import React, { useState, useEffect } from "react";
import { url } from "../../Utils/Config";
import "./InvitationMain/InvitaionMain.css"
import { Container, Row, Col, Carousel, Form } from "react-bootstrap";
import Header from "../Helpers/Header/Header"
import NavMobile from "../Helpers/NavMobile/NavMobile";
import DesktopNav from "../Helpers/DesktopNav/DesktopNav";
import axios from "axios";
import Image from "react-bootstrap/Image";
import SendIcon from "../../Assets/ic-send.png";
import { AiOutlineLike, AiOutlineSync } from "react-icons/ai"
import { GoCalendar, GoLocation } from "react-icons/go"
import CommentIcon from "../../Assets/comment-dot.png";
import UserDataUrl from "../Helpers/UserData/UserDatajustUrl";
import Location from "../../Assets/Location.png";
import history from "../../Utils/History";
import LIKE from "../../Assets/LIKE.png";
import RSVP from "../../Assets/RSVP.png";
import LoginSignup from "../Auth/LoginSignup";
import { FaUserFriends } from "react-icons/fa";
import Popup from "../Helpers/Popups/Popup";
import { useSelector, useDispatch } from "react-redux";
import { GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import './Invitations.css'
import './InvitationMain/InvitaionMain.css'
import { addEvent } from '../../Redux/DispatchFuncitons/CodeFunctions'
export default function Hoxinvitation(props) {
  const [Invitations, setInvitations] = useState([]);
  const [show, setshow] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  const dispatch = useDispatch();
  useEffect(async () => {
    debugger
    if (Auth.isLoggedIn === false) {
      if (props.match.params.Name !== undefined && props.match.params.Code !== "") {
        await dispatch(addEvent(props.match.params.Name, props.match.params.Code))
        // await dispatch(GetInvitations());
        // history.push("/");
      }
    }
    else {
      await dispatch(GetInvitations());
      myInvitations.map((invite, index) => {
        console.log(invite);
        if (invite[0].MainCode === props.match.params.maincode) {
          history.push("/inv/eventpage/" + index);
        }
      });

    }

  }, [Auth.isLoggedIn]);
  useEffect(async () => {
    if (props.match.params.Name === undefined) {
      console.log(props.match.params.maincode);
      await axios
        .post(url + "event/viewinvite", {
          MainCode: props.match.params.maincode,
        })
        .then((res) => {
          console.log(res);
          if (res.data.Status === "success") {
            setInvitations(res.data.Events);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    } else {
      await axios
        .post(url + "event/viewEvent", {
          Name: props.match.params.Name,
          Code: props.match.params.Code
        })
        .then(async (res) => {
          debugger;
          if (res.data.Status === "success") {
            await dispatch(addEvent(res.data.Events[0].code, res.data.Events[0].Name))
            setInvitations(res.data.Events);
          }
        })
        .catch((err) => {
          console.log(err);
          return { err: "error 404" };
        });
    }

  }, []);

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <DesktopNav />
      <Popup
        component={LoginSignup}
        toggleShowPopup={setshow}
        showPopup={show}
      />
      <Carousel controls={false} interval={99999999999999} className="mb-10">
        {Invitations &&
          Invitations.map((eve, index) => (
            <Carousel.Item
              onClick={() => {
                setshow(true);
              }}
            >
              <Container className="upper-menu">
                <Row
                  style={{
                    marginTop: 20,
                    marginRight: 3,
                    marginLeft: 3,
                    marginBottom: 10,
                  }}
                >
                  <p style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
                    <IoArrowBackCircleOutline
                      style={{ backgroundColor: '#313131', borderRadius: '50px' }}
                      size={40} />
                  </p>
                  <Col></Col>
                  <FaUserFriends
                    size={30}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: 20,
                      padding: "0.1em 0.4em",
                    }} />
                </Row>
              </Container>
              <Container className="container-event">
                <Image src={eve.file} className="fullimagemain" />
                <Container className="box-event" fluid style={{ marginTop: "5vh" }}>

                  <UserDataUrl
                    Phone={eve.Host[0]}
                    showIcon={true}
                    className="m-10px"
                  />
                  <div style={{ position: "relative", float: "right" }}>
                    <Image src={SendIcon} style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "1.5vh",
                    }} />

                    <Image src={CommentIcon} className="go-chat" />
                  </div>
                  <h4 className="avatar-name">
                    <UserDataUrl Phone={eve.Host[0]} showName={true} />
                  </h4>
                  <Form.Control
                    size="sm"
                    placeholder="Write Comment"
                    className="form-control"
                    style={{
                      border: 0,
                      width: "auto",
                      height: "20px",
                      marginLeft: "60px",
                    }}
                  />

                  <br />
                  <Row>
                    <Col>
                      <center>
                        <span className="Like-count">0</span>

                        <AiOutlineLike size="25" className="info-icon"
                          style={{ color: "#4e4e4e" }} />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <AiOutlineSync size="25"
                          style={{ color: "#4e4e4e" }} />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <GoCalendar
                          style={{ color: "#4e4e4e" }}
                          size="25" />
                      </center>
                    </Col>
                    <Col>
                      <center>

                        <GoLocation
                          style={{ color: "#4e4e4e" }}
                          size="25" />
                      </center>
                    </Col>
                  </Row>
                  <br />

                  <h3 className="event-date">{eve.Date + " " + eve.Time}</h3>
                  <p className="event-des">{eve.Description}</p>
                  <a href="#" className="invitationmain_link">Read More</a>
                </Container>
              </Container>
            </Carousel.Item>
          ))}
      </Carousel>
      <NavMobile />
    </>
  );
}
