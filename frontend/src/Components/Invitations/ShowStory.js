import React, { useState, useEffect } from "react";
import "./OurStory.css";
import Header from "../Helpers/Header/Header";
import MobileNav from "../Helpers/NavMobile/NavMobile";
import { Container, Card, Button, Row, Col, Figure } from "react-bootstrap";
import { FcCalendar, FcLike } from "react-icons/fc";
import BlankSchedule from "../../Assets/NoStory.svg";
import { useSelector, useDispatch } from "react-redux";
import {
    GetEvents,
    GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function ShowStory(props) {
    const [Eventdata, setEventdata] = useState([]);
    const [base, setbase] = useState("");
    const [images, setimages] = useState([]);
    const dispatch = useDispatch();
    let MyEvents = useSelector((state) => state.Eventdata.myEvents);

    let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
    useEffect(async () => {
        debugger;
        if (MyEvents.length === 0 && myInvitations.length === 0) {
            await dispatch(GetEvents());
            await dispatch(GetInvitations());
        } else {
            if (
                props.location.pathname ===
                "/MyEvents/story/" + props.match.params.id &&
                MyEvents.length > 0
            ) {
                console.log(MyEvents[props.match.params.id][0]);
                await setEventdata(MyEvents[props.match.params.id][0].InvId.Story);
                await setbase("MyEvents");
            } else if (
                props.location.pathname === "/inv/story/" + props.match.params.id &&
                myInvitations.length > 0
            ) {
                console.log(myInvitations[0]);
                await setEventdata(myInvitations[props.match.params.id][0].InvId.Story);
                await setbase("inv");
            }
        }
    }, [MyEvents, myInvitations]);
    return (
        <div>
            <div className="desktop-only w-100">
                <Header className="desktop-only" />
            </div>
            <MobileNav id={props.match.params.id} base={base} />
            <Container fluid className="p-0">
                {Eventdata.length > 0 ? (
                    Eventdata.map((stry, index) => (
                        <div className="row">
                            <div className="col-12 mt-3" style={{ padding: '30px', paddingTop: 'inherit', paddingBottom: 'inherit' }}>
                                <div
                                    className="card"
                                    style={{ boxShadow: "1px 1px 7px 1px #b9b9b9" }}
                                >
                                    <div className="card-horizontal">
                                        <div className="card-body">
                                            <Row>
                                                <Col xs={4} style={{ margin: "auto" }}>
                                                    <img src={stry.file} className="w-100 card_image" />
                                                </Col>
                                                <Col xs={8}>
                                                    <h4 className="card-title ourstory_heading">
                                                        {stry.Name}
                                                    </h4>
                                                    <p
                                                        className="card-text ourstory_text"
                                                        style={{ fontSize: 13, color: 'grey', height: '32px', overflow: 'scroll', background: '#e2ffff' }}
                                                    >
                                                        {stry.description}
                                                    </p>
                                                    {/* <p className="card-text"><FcLike size="30" /> 20</p> */}
                                                    <p className="card-text ourstory_date" style={{ color: '#007bff' }}>
                                                        <FcCalendar size="20" /> {stry.datetime}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        {" "}
                        <img src={BlankSchedule} className="blank-img" />
                        <br />
                        <h3 className="tac">Story not Added yet </h3>
                    </>
                )}
            </Container>
        </div>
    );
}
