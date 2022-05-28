import React, { useState, useEffect } from "react";
import "../Sidebar/Sidebar.css";
import { IoArrowBackCircleOutline, IoCall } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Component } from "react";
import Header from "../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import DancingImg from "../../Assets/DancingImg.png";
import { GoBook } from "react-icons/go";
import { IoImagesSharp, IoPowerSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import { logout } from '../../Redux/DispatchFuncitons/AuthFunctions'
export default function SidebarMore(props) {
  const [base, setbase] = useState("");
  const [ishost, setishost] = useState(false);
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([]);
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);

  useEffect(async () => {
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (props.location.pathname === "/MyEvents/more/" + props.match.params.id && MyEvents.length > 0) {
        await setEventdata(MyEvents[props.match.params.id])
        await setbase("MyEvents");
        console.log(Eventdata)
        var Host = MyEvents[props.match.params.id][0].InvId.Host;
        for (var i = 0; i < Host.length; i++) {
          if (Host[i] === Auth.Phone) {
            await setishost(true);
            console.log(ishost)
          }
        }
      } else if (props.location.pathname === "/inv/more/" + props.match.params.id && myInvitations.length > 0) {

        await setEventdata(myInvitations[props.match.params.id])
        await setbase("inv");
        console.log(Eventdata)
        var Host = myInvitations[props.match.params.id][0].InvId.Host;
        for (var i = 0; i < Host.length; i++) {
          if (Host[i] === Auth.Phone) {
            await setishost(true);
            console.log(ishost)
          }
        }
      }
    }

  }, [myInvitations, MyEvents]);
  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Container className="guestlist-box" style={{ padding: "25px" }}>
        <Row>
          <Col>
            <p
              style={{
                fontWeight: 600,
                fontSize: 20,
                paddingLeft: "10px",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <IoArrowBackCircleOutline
                size={30}
                onClick={() => {
                  history.goBack();
                }}
              />
              More
            </p>
          </Col>
        </Row>
        <Image src={DancingImg} className="sidebar_img" />
        <a
          className="linkto-rows"
          onClick={() => {
            history.push("../" + "story/" + props.match.params.id);
          }}
        >
          <Row className="sidebar-rows">
            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <GoBook size="25" /> Our Story
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>

        {/* <a
          className="linkto-rows"
          onClick={() => {
            history.push("../" + "albums/" + props.match.params.id);
          }}
        >
          <Row className="sidebar-rows">
            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                {" "}
                <IoImagesSharp size="25" /> Albums
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a> */}
        {ishost === true ? (
          <a
            className="linkto-rows"
            onClick={() => {
              history.push("/MyEvents/" + "admin/" + props.match.params.id);
            }}
          >
            <Row className="sidebar-rows">
              <Col>
                <p style={{ margin: "auto", padding: "15px" }}>
                  <FaUserAlt size="20" /> Admin
                </p>
              </Col>
              <Col>
                <p>
                  {" "}
                  <RiArrowRightSLine size={20} className="arrow-iconcs" />
                </p>
              </Col>
            </Row>
          </a>
        ) : (
          <></>
        )}
        {/* 
        <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Templates</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

        {/*  <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Articles</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

        {/*  <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>About Us</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

        <a className="linkto-rows">
          <Row className="sidebar-rows">

            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <IoCall size="25" /> Contact Us
              </p>
            </Col>
            <Col>
              <p>
                {" "}
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>
        <a className="linkto-rows" onClick={() => { dispatch(logout()) }}>
          <Row className="sidebar-rows">

            <Col>
              <p style={{ margin: "auto", padding: "15px" }}>
                <IoPowerSharp size="25" /> Logout
              </p>
            </Col>
            <Col>
              <p>
                <RiArrowRightSLine size={20} className="arrow-iconcs" />
              </p>
            </Col>
          </Row>
        </a>

        {/* <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Recommendaton</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

        {/*  <a className="linkto-rows">
          <Row className="sidebar-rows">
            <Col>Prices</Col>
            <Col>
              <RiArrowRightSLine size={20} className="arrow-iconcs" />
            </Col>
          </Row>
        </a> */}

      </Container>
    </>
  );
}
