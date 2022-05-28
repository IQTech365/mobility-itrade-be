import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { MdEvent } from "react-icons/md";
import { IoImagesSharp, IoPowerSharp } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { BiNews } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import "./NavMobile.css";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { BiChevronDown } from "react-icons/bi";
import history from "../../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popups/Popup";
import Notifications from "../../Notifications/Notification";
export default function NavMobile(props) {
  const [show, setshow] = useState(false);
  const [maincode, setmaincode] = useState("");
  const [eventcode, seteventcode] = useState("");
  const Auth = useSelector((state) => state.Auth);
  const [ishost, setishost] = useState(false);

  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      props.Eventdata[0].InvId.Host.map((host) => {
        if (host === Auth.Phone) {
          setishost(true);
        }
      });
      console.log(props.Eventdata[0].InvId.Host);
    }
  }, [props.Eventdata]);
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        style={{ position: "fixed", left: 0, bottom: 0, width: "100vw", zIndex: 255 }}
        className="deskhide-nav"
      >
        <Nav style={{ margin: "auto" }}>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/eventpage/' + props.id);
            }}
            style={{ marginRight: "4vh" }}
          >
            <MdEvent size={30} />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/albums/' + props.id);
            }}
            style={{ marginRight: "4vh" }}
          >
            <IoImagesSharp size={25} />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + '/eventpage/' + "feed/" + props.id);
            }}
            style={{ marginRight: "4vh" }}
          >
            <BiNews size={25} />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              setshow(true);
            }}
            style={{ marginRight: "4vh" }}
          >
            <AiOutlineBell size={25} />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              history.push("/" + props.base + "/more/" + props.id);
            }}
            style={{ marginRight: "-1vh" }}
          >
            <BsThreeDots size={25} />
          </Nav.Link>
        </Nav>
      </Navbar>
      <Popup
        component={Notifications}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={props.MainCode}
        showinvitaions={true}
        eventcode={eventcode}
      />
    </>
  );
}
