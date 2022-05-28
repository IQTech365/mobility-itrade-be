import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Tab, Tabs } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "../Guest/Guest.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import Userdataurl from "../Helpers/UserData/UserDatajustUrl";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { useSelector, useDispatch } from "react-redux";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Guest(props) {
  const [Events, setEvents] = useState([]);
  const [guestList, setguestList] = useState([]);
  const [guestListaccept, setguestListaccept] = useState([]);
  const [guestListdecline, setguestListdecline] = useState([]);
  const [guestListmaybe, setguestListmaybe] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([]);
  const [base, setbase] = useState("");
  const Auth = useSelector((state) => state.Auth);
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents
  );

  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations
  );
  useEffect(async () => {
    debugger;
    let RSVPList = []
    let Participants = []
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/guestlist/" +
        props.match.params.id +
        "/" +
        props.match.params.invno && MyEvents.length > 0
      ) {
        await setEventdata(MyEvents[props.match.params.id]);
        await setbase("MyEvents");
        await setEvents(Eventdata);
        console.log(MyEvents[props.match.params.id][props.match.params.invno].RSVPList);
        await setguestList([...MyEvents[props.match.params.id][props.match.params.invno].RSVPList,
        ...MyEvents[props.match.params.id][props.match.params.invno].Host]);
        RSVPList = MyEvents[props.match.params.id][props.match.params.invno].RSVPList;
        if (MyEvents[props.match.params.id][props.match.params.invno].Host.includes(Auth.Phone)) {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
        let data = MyEvents[props.match.params.id][props.match.params.invno]
        Participants = [...data.Participants,
        ...data.Host];
      } else if (
        props.location.pathname ===
        "/inv/guestlist/" +
        props.match.params.id +
        "/" +
        props.match.params.invno && myInvitations.length > 0
      ) {
        await setEventdata(myInvitations[props.match.params.id]);
        await setbase("inv");
        await setEvents(Eventdata);
        await setguestList([...myInvitations[props.match.params.id][props.match.params.invno].RSVPList,
        ...myInvitations[props.match.params.id][props.match.params.invno].Host]);
        RSVPList = myInvitations[props.match.params.id][props.match.params.invno].RSVPList;
        if (myInvitations[props.match.params.id][props.match.params.invno].Host.includes(Auth.Phone)) {
          setisAdmin(true);
        } else {
          setisAdmin(false);
        }
        let data = myInvitations[props.match.params.id][props.match.params.invno]
        Participants = [...data.Participants,
        ...data.Host];

      }

      let accept = [];
      let decline = [];
      let maybe = [];

      RSVPList.map((rsvp) => {
        if (rsvp.Status === "Accept") {
          accept.push(rsvp);
        }
        if (rsvp.Status === "Decline") {
          decline.push(rsvp);
        }
        if (rsvp.Status === "May Be") {
          maybe.push(rsvp);
        }
      });

      let all = [];
      debugger;


      let allrsvp = accept.concat(decline);
      allrsvp = allrsvp.concat(maybe);
      let Status = "Invited";
      for (let j = 0; j < Participants.length; j++) {
        let Status = "Invited";
        let found = false;
        for (let k = 0; k < allrsvp.length; k++) {
          if (
            allrsvp[k].By === Participants[j] ||
            allrsvp[k].By === "+91" + Participants[j]
          ) {
            Status = allrsvp[k].Status;
            found = true;
            break;
          } else {
            console.log("x");
          }
        }

        if (Participants[j].toString().startsWith("+")) {
          all.push({ By: Participants[j], Status: Status });
        } else {
          all.push({ By: "+91" + Participants[j], Status: Status });
        }
        found = false;
      }
      setguestList(all);
      setguestListaccept(accept);
      setguestListdecline(decline);
      setguestListmaybe(maybe);
    }
  }, [myInvitations, MyEvents]);

  return (
    <>
      <div className="desktop-only w-100" >
        <Header className="desktop-only" />
      </div>
      <Container className="guest-box">
        <Row
          style={{
            marginTop: 30,
            marginRight: 3,
            marginLeft: 3,
            width: "100%",
          }}
        >
          <Col xs={9}>
            <p style={{ fontWeight: "bold", fontSize: 20 }}>
              <IoArrowBackCircleOutline
                size={32}
                onClick={() => {
                  console.log(
                    "/" + base + "/eventpage/" + props.match.params.id
                  );
                  history.push(
                    "/" + base + "/eventpage/" + props.match.params.id
                  );
                }}
              />
              View Guest
            </p>
          </Col>
          <Col>
            {isAdmin === true ? (
              <span
                style={{ fontWeight: "500", fontSize: 20 }}
                onClick={() => {
                  history.push(
                    "/MyEvents" +
                    "/Manage-GuestList/" +
                    props.match.params.id +
                    "/" +
                    props.match.params.invno
                  );
                }}
              >
                <SupervisedUserCircleIcon />
                <span className="manage_guest">Manage Guests</span>
              </span>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <Row style={{ marginLeft: "auto" }}>
          <Col>
            <Tabs defaultActiveKey="All">
              <Tab eventKey="All" title="All">
                {guestList.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>

              <Tab eventKey="Accept" title="Accept">
                {guestListaccept.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
              <Tab eventKey="Decline" title="Decline">
                {guestListdecline.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
              <Tab eventKey="Maybe" title="Maybe">
                {guestListmaybe.map((guest) => (
                  <Container className="p-5px">
                    <Row className="m-0 ">
                      <Col xs={2} md={1}>
                        <Userdataurl showIcon={true} Phone={guest.By} />
                      </Col>
                      <Col>
                        <Row className="m-0 ">
                          <Userdataurl showName={true} Phone={guest.By} />
                        </Row>
                        <Row className="m-0 ">
                          <span
                            className={
                              "status " + guest.Status === "Accept"
                                ? "user-accept "
                                : guest.Status === "Decline"
                                  ? "user-decline"
                                  : guest.Status === "May Be"
                                    ? "user-maybe"
                                    : "user-invited"
                            }
                          >
                            {guest.Status}
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
}
