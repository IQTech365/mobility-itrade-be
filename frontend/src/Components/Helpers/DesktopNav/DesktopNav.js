import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiNews } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import history from "../../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../Popups/Popup";
import Notifications from "../../Notifications/Notification";
import { GoBook } from "react-icons/go";
import { IoImagesSharp, IoPowerSharp } from "react-icons/io5";
export default function DesktopNav(props) {
  const Auth = useSelector((state) => state.Auth);
  const useStyles = makeStyles({});
  const [ishost, setishost] = useState(false);
  const [show, setshow] = useState(false);
  useEffect(() => {
    if (props.Eventdata && props.Eventdata.length > 0) {
      debugger
      console.log(props.Eventdata)
      var Host = props.Eventdata[0].InvId.Host;
      for (var i = 0; i < Host.length; i++) {
        if (Host[i] === Auth.Phone) {
          setishost(true);
        }
      }
    }
    console.log(props.base);
  }, [props.Eventdata]);

  return (
    <Container className="navigation-box" fluid>
      <Row>
        <Col
          md={2}
          className="tac"
          onClick={() => {
            history.push("../albums/" + props.id);
          }}
        >
          <IoImagesSharp size={30} />
          <a>Album</a>
        </Col>
        <Col
          md={2}
          className="tac"
          onClick={() => {
            history.push("./feed/" + props.id);
          }}
        >
          <BiNews size={30} />
          Feed
        </Col>
        <Col
          md={2}
          className="tac"
          onClick={() => {
            setshow(true);
          }}
        >
          <AiOutlineBell size={30} />
          Notifications
        </Col>
        <Col md={2} className="tac">
          <DropdownButton id="dropdown-item-button" title="More">
            <Dropdown.Item
              as="button"
              onClick={() => {
                history.push("/" + props.base + "/story/" + props.id);
              }}
            >
              Our Story
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                history.push("/" + props.base + "/albums/" + props.id);
              }}
            >
              Albums
            </Dropdown.Item>
            {ishost === true ? (
              <Dropdown.Item
                as="button"
                onClick={() => {
                  history.push("/MyEvents/admin/" + props.id);
                }}
              >
                Admin
              </Dropdown.Item>
            ) : (
              <></>
            )}
          </DropdownButton>
        </Col>
      </Row>
      <Popup
        component={Notifications}
        toggleShowPopup={setshow}
        showPopup={show}
        MainCode={props.MainCode}
        showinvitaions={true}
      />
    </Container>
  );
}
