import React, { useState, useEffect } from "react";
import "./InvitaionMain.css";
import Header from "../../Helpers/Header/Header";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import SendIcon from "../../../Assets/ic-send.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CalendarIcon from "../../../Assets/Calender.png";
import { GrSync } from "react-icons/gr"
import LIKE from "../../../Assets/LIKE.png";
import RSVP from "../../../Assets/RSVP.png";
import { GoCalendar, GoLocation } from "react-icons/go"

import Carousel from "react-bootstrap/Carousel";
import CommentIcon from "../../../Assets/comment-dot.png";
import UserDataUrl from "../../Helpers/UserData/UserDatajustUrl";
import Location from "../../../Assets/Location.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineLike, AiOutlineSync } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux";
import {
  like_event,
  comment_event, GetInvitations, GetEvents
} from "../../../Redux/DispatchFuncitons/Eventfunctions";
import history from "../../../Utils/History";
import NavMobile from "../../Helpers/NavMobile/NavMobile";
import DesktopNav from "../../Helpers/DesktopNav/DesktopNav";
import Toggler from "../../Helpers/EventInvitoggler/Toggler";
import { FaUserFriends } from "react-icons/fa";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HelpIcon from "@material-ui/icons/Help";
export default function InvitaionMain(props) {
  const dispatch = useDispatch();
  const [comment, setcomment] = useState("");
  const [likeCount, setlikeCount] = useState([]);
  const [MainCode, setmaincode] = useState();
  const [commentcountplus, setcommentcountplus] = useState(0);
  const Auth = useSelector((state) => state.Auth);
  const checkiflike = (index) => {
    let likeCountCopy = [...likeCount];
    if (likeCount.length > 0) {
      if (likeCount[index].me === true) {
        likeCountCopy[index].me = false;
        likeCountCopy[index].count -= 1;
      } else {
        likeCountCopy[index].me = true;
        likeCountCopy[index].count += 1;
      }
    } else {
      likeCountCopy[index].me = true;
      likeCountCopy[index].count = 1;
    }
    setlikeCount(likeCountCopy);
  };

  useEffect(async () => {
    console.log(props.Eventdata);
    if (props.Eventdata && props.Eventdata.length > 0) {
      await setmaincode(props.Eventdata[0].MainCode)
      let countarray = [];
      let liked = false;
      for (let i = 0; i < props.Eventdata.length; i++) {
        if (props.Eventdata[i].LikeList.length <= 0) {
          countarray.push({ count: 0, me: false });
        } else {
          for (let j = 0; j < props.Eventdata[i].LikeList.length; j++) {
            if (props.Eventdata[i].LikeList.LikeBy === Auth.Phone) {
              liked = true;
            } else {
            }
          }
          countarray.push({
            count: props.Eventdata[i].LikeList.length,
            me: liked,
          });
          liked = false;
        }
      }
      console.log(countarray);
      setlikeCount(countarray);
    }
    setcommentcountplus(0)
  }, [props.Eventdata]);

  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <DesktopNav
        id={props.id}
        MainCode={MainCode}
        base={props.base}
        Eventdata={props.Eventdata}

      />
      {/*  <Toggler /> */}

      <Carousel controls={false} interval={99999999999999} className="mb-10">
        {props.Eventdata &&
          props.Eventdata.map((eve, index) => (
            <Carousel.Item>
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
                      size={40}
                      onClick={() => {
                        history.push("/" + props.base);
                      }}
                    />

                  </p>
                  <Col></Col>
                  <FaUserFriends
                    size={30}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: 20,
                      padding: "0.1em 0.4em",
                    }}
                    onClick={() => {
                      history.push(
                        "/" +
                        props.base +
                        "/guestlist/" +
                        props.id +
                        "/" +
                        index
                      );
                    }}
                  />
                </Row>
              </Container>
              <Container className="container-event">
                {eve.filetype === "png" || eve.filetype === "jpg" || eve.filetype === "jpeg" ? (
                  <Image src={eve.file} className="fullimagemain" />) : (
                  <video
                    muted
                    type="video/mp4"
                    autoPlay={true}
                    src={
                      eve.file
                    }

                    preload="none"
                    className='w-100'
                  />
                )}
                <Container
                  className="box-event"
                  fluid
                  style={{ marginTop: "5vh" }}
                ><div style={{ position: 'relative', left: '10px', top: '3px' }}>
                    <UserDataUrl
                      Phone={eve.Host[0]}
                      showIcon={true}
                      className="m-10px"

                    /></div>
                  <div
                    className="event-chat-buttons"
                    style={{ marginTop: "1vh" }}
                  >

                    <Image
                      src={SendIcon}
                      style={{
                        height: "20px",
                        width: "20px",
                        marginRight: "1.5vh",
                      }}
                      onClick={async () => {
                        if (comment !== "") {
                          await dispatch(comment_event(eve._id, comment));
                          setcomment("");

                          await setcommentcountplus(commentcountplus + 1)
                        }
                      }}
                    /><>
                      <span className="Like-count comment_like">
                        {eve.CommentList
                          ? eve.CommentList.length + commentcountplus
                          : 0 + commentcountplus}
                      </span>
                      <Image
                        src={CommentIcon}
                        className="go-chat"
                        onClick={() => {
                          history.push(
                            "/" + props.base + "/comments/" + props.id + "/" + eve._id
                          );
                        }}
                      /></>
                  </div>
                  <h4 className="avatar-name">
                    <UserDataUrl Phone={eve.Host[0]} showName={true} />
                  </h4>
                  <Form.Control
                    size="sm"
                    placeholder="Write Comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => {
                      setcomment(e.target.value);
                    }}
                    style={{
                      border: 0,
                      width: "auto",
                      height: "20px",
                      marginLeft: "60px",
                    }}
                  />

                  <br />
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <center>
                        <span className="Like-count">
                          {likeCount[index] != undefined
                            ? likeCount[index].count
                            : 0}
                        </span>
                        <AiOutlineLike size="25" className="info-icon"
                          style={{ color: "#4e4e4e" }}
                          onClick={() => {
                            checkiflike(index);
                            dispatch(like_event(eve._id));
                          }} />

                      </center>
                    </Col>
                    <Col onClick={() => {
                      history.push(
                        "/" + props.base + "/rsvp/" + props.id
                      );
                    }}>
                      <center>
                        <div>
                          <IsRsvp RSVPList={eve.RSVPList} />
                          <AiOutlineSync size="25"
                            style={{ color: "#4e4e4e" }} />
                          {/* <Image
                            src={RSVP}

                            className="info-icon"
                          /> */}
                        </div>
                      </center>
                    </Col>
                    <Col>
                      <center>
                        <GoCalendar
                          style={{ color: "#4e4e4e" }}
                          size="25"
                          onClick={() => {
                            history.push(
                              "/" +
                              props.base +
                              "/schedule/" +
                              props.id +
                              "/" +
                              index
                            );
                          }} />
                        {/*  <Image
                          src={CalendarIcon}
                          
                        /> */}
                      </center>
                    </Col>
                    <Col>
                      <center>
                        <GoLocation
                          style={{ color: "#4e4e4e" }}
                          size="25"
                          onClick={() => {
                            history.push(
                              "/" +
                              props.base +
                              "/location/" +
                              props.id +
                              "/" +
                              index
                            );
                          }} />
                        {/*  <Image
                          src={Location}
                          
                        /> */}
                      </center>
                    </Col>
                  </Row>
                  <br />
                  <h2 className="event-date">{eve.Name}</h2>
                  <h3 className="event-date">{eve.Date + " " + eve.Time}</h3>
                  <p className="event-des">{eve.Description}</p>
                  <a href="#" className="invitationmain_link">Read More</a>
                </Container>
              </Container>
            </Carousel.Item>
          ))}
      </Carousel>
      <NavMobile
        className="footnavmobile"
        id={props.id}
        MainCode={MainCode}
        base={props.base}
        Eventdata={props.Eventdata}
      />
    </>
  );
}
export function IsRsvp(props) {
  const Auth = useSelector((state) => state.Auth);
  const [showicon, setshowicon] = useState("");
  useEffect(() => {
    debugger;
    for (let i = 0; i < props.RSVPList.length; i++) {
      if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "Accept"
      ) {
        setshowicon("Accept");
      } else if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "May Be"
      ) {
        setshowicon("May Be");
      } else if (
        props.RSVPList[i].By === Auth.Phone &&
        props.RSVPList[i].Status === "Decline"
      ) {
        setshowicon("Decline");
      } else {
      }
    }
    console.log(showicon);
  }, [props.RSVPList]);
  return (
    <span className="RSVP-count">
      {showicon === "Accept" ? (
        <CheckCircleIcon style={{ color: "Green" }} />
      ) : showicon === "Decline" ? (
        <CancelIcon color="secondary" />
      ) : showicon === "May Be" ? (
        <ErrorIcon style={{ color: "#dec509" }} />
      ) : (
        <HelpIcon color="primary" />
      )}
    </span>
  );
}
