import React, { useState, useEffect } from "react";
import Header from "../Helpers/Header/Header.js";
import Toggler from "../Helpers/EventInvitoggler/Toggler.js";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "./EventAdmin.css";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import { url } from "../../Utils/Config";
import axios from "axios";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";

export default function EventAdmin2() {
    const dispatch = useDispatch();
    const [options, setoptions] = useState({
        labels: ["Yes", "No", "Maybe/Not Decided"],
        colors: ["#008744", "#E74D5F", "#FFA700"],
    });
    const [series, setseries] = useState([50, 30, 20]);
    const [comment, setcomment] = useState("");
    const [base, setbase] = useState("")
    const Auth = useSelector((state) => state.Auth);
    const [Eventdata, setEventdata] = useState("")
    const [Rsvplist, setRsvplist] = useState([])
    let MyEvents = useSelector(
        (state) =>
            state.Eventdata.myEvents
    );

    useEffect(async () => {
        if (MyEvents && MyEvents.length > 0) {
            let Rsvplistcpy = []
            let accept = [];
            let decline = [];
            let maybe = [];
            let Participants = []
            await setEventdata(MyEvents[props.match.params.id][props.match.params.id])
            await setRsvplist(MyEvents[props.match.params.id][props.match.params.id])
            await setRsvplist(MyEvents[props.match.params.id][props.match.params.id].RSVPList)
            Rsvplistcpy = [...MyEvents[props.match.params.id][props.match.params.id].RSVPList]
            Participants = MyEvents[props.match.params.id][props.match.params.id].Participants;
            Rsvplistcpy.map((rsvp) => {
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
            let allrsvp = accept.concat(decline);
            allrsvp = allrsvp.concat(maybe);
            for (let j = 0; j < Participants.length; j++) {
                let Status = "invited";
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
            setseries([accept.length, decline.length, maybe.length]);
        }

    }, [MyEvents])
    const submit = () => {
        if (comment !== "") {
            console.log({
                message: comment,
                Participants: Eventdata.Participants,
                by: Auth.Phone,
                img: Eventdata.file,
                Eid: Eventdata._id,
                Maincode: Eventdata.MainCode,
            });

            axios
                .post(url + "notification/sendNotifications", {
                    message: comment,
                    Participants: Eventdata.Participants,
                    by: Auth.Phone,
                    img: Eventdata.file,
                    Eid: Eventdata._id,
                    Maincode: Eventdata.MainCode,
                })
                .then((res) => {
                    if (res.data.data) {
                        console.log(res.data.data);
                        setcomment("");
                        alert("message Sent as Notification");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("message failed ");
                });
        }
    };
    return (
        <>
            <div className="w-100 desktop-only ">
                <Header />
            </div>
            <Container style={{ marginTop: 25 }}>
                <Row>
                    <Col>
                        <p style={{ fontWeight: 700, fontSize: 23 }}>
                            <IoArrowBackCircleOutline
                                size={40}
                                onClick={() => {
                                    history.goBack();
                                }}
                            />
                            Event
                        </p>
                    </Col>
                    <Col>
                        {/* <Button
                  variant="dark"
                  style={{ float: "right", borderRadius: 20 }}
                  className="edit-eventbtn"
                  onClick={() => {
                    history.push(
                      "/" + base + "/Manage-Event/" +
                      props.match.params.id +
                      "/" +
                      props.match.params.eid
                    );
                  }}
                >
                  Edit Event
                </Button> */}
                    </Col>
                </Row>

                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="400"
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                    }}
                />
                <Row style={{ justifyContent: "center" }}>
                    <Button
                        variant="primary"
                        className="manage-guestbtn"
                        style={{ width: "40vh", borderRadius: 20, marginTop: 30 }}
                        onClick={() => {
                            history.push(
                                "/" + base + "/Manage-GuestList/" +
                                props.match.params.id +
                                "/" +
                                props.match.params.eid
                            );
                        }}
                    >
                        Manage Guest
                    </Button>
                </Row>
                <Row className="messageboard">
                    <h3 className="messageboard-txt">Message Board</h3>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    {" "}
                    <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Write text here"
                        style={{ marginTop: 10 }}
                        onChange={(e) => {
                            setcomment(e.target.value);
                        }}
                        value={comment}
                    />
                    <Button
                        variant="outline-primary"
                        style={{ width: "40vh", borderRadius: 20, marginTop: 30 }}
                        onClick={() => {
                            submit();
                        }}
                    >
                        Send
                    </Button>
                </Row>
            </Container>
        </>
    );
}

