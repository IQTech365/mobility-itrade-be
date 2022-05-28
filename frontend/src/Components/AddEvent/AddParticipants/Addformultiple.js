import React, { useState, useEffect } from 'react'
import {
    Container,
    Row,
    Button,
    ListGroup,
    Tabs,
    Tab,
    Col,
    Spinner,
} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Addformultiple(props) {
    const [participants, setparticipants] = useState([])
    const [width, setwidth] = useState('100%')
    useEffect(async () => {
        console.log(props)
        await setparticipants(props.participants)
        await setwidth(100 / props.Events.length + "vw")
    }, [props.participants])
    const readExcel = async (file) => {
        debugger;
        const fileReader = new FileReader();
        await fileReader.readAsArrayBuffer(file);
        fileReader.onload = async (e) => {
            const bufferArray = e.target.result;
            const wb = await XLSX.read(bufferArray, { type: "buffer" });
            const wsname = await wb.SheetNames[0];
            const ws = await wb.Sheets[wsname];
            const data = await XLSX.utils.sheet_to_json(ws);
            await props.saveparticipantsfromexcel(data)
        };
        fileReader.onerror = (error) => {
            console.log(error);
        };
    };
    const DeleteThisContact = (index) => {
        let particpantscpy = [...props.participants];
        let NexteventKey = parseInt(props.eventKey) + 1;
        particpantscpy[props.eventKey] = particpantscpy[props.eventKey].filter((word, i) => index !== i);
        props.setParticipants(particpantscpy);
    };

    const copyToNext = () => {
        let particpantscpy = [...props.participants];
        if (particpantscpy.length === 0) {
            alert("Please add contacts to this event Firts");
        } else {
            if (props.eventKey < 3 && props.eventKey < props.Events.length - 1) {

                let NexteventKey = parseInt(props.eventKey) + 1;
                particpantscpy[NexteventKey] = particpantscpy[props.eventKey];
                console.log(particpantscpy);
                props.setParticipants(particpantscpy);
            } else {
                alert("No more Events to copy");
            }
        }
    };

    return (
        <>
            <Container fluid className="p-0">
                <h3 className="p-15px">Add Guests</h3>

                <Tabs
                    activeKey={props.eventKey}
                    onSelect={(k) => {
                        console.log(k);
                        props.setKey(k);
                    }}
                >
                    {props.Events &&
                        props.Events.map((eve, index) => (
                            <Tab eventKey={index} title={eve.Name.substring(1, 4) + "..."} style={{ width: width }}>
                                <ListGroup style={{ margin: "auto" }} className="listitems_box">
                                    {participants && participants[props.eventKey] && participants[props.eventKey].map((listdata, i) => (
                                        <ListGroup.Item>
                                            {listdata}
                                            <AiFillCloseCircle
                                                size="25"
                                                style={{ float: "right", color: "red" }}
                                                onClick={() => {
                                                    DeleteThisContact(i);
                                                }}
                                            />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Tab>
                        ))}
                </Tabs>
                <Row>
                    {
                        props.isMobile === true ? (
                            <Button
                                variant="outline-primary"
                                className="addcontacts_btn"
                                style={{ margin: "auto", width: "30%", borderRadius: 20 }}
                                onClick={() => {
                                    props.openContactPicker();
                                }}
                            >
                                <BsFillPeopleFill /> Add Contacts mob
                            </Button>
                        ) : (
                            <>
                                <label
                                    htmlFor="input2"
                                    className="addcontacts_btn btn btn-outline-primary"
                                    style={{ display: props.isMobile === false ? "block" : "none" }}
                                    style={{ margin: "auto", width: "30%", borderRadius: 20 }}
                                    onClick={() => { console.log("done 3") }}
                                >
                                    <BsFillPeopleFill /> Add Contacts
                                </label>
                                <input
                                    id="input2"
                                    type="file"
                                    accept=".xlsx"
                                    onChange={(e) => {
                                        console.log("done 4")
                                        const file = e.target.files[0];
                                        readExcel(file);

                                    }}
                                    placeholder="Add Participants"
                                    style={{ display: "none" }}
                                />
                            </>
                        )

                    }
                    <Button
                        variant="outline-primary"
                        style={{ margin: "auto", width: "30%", borderRadius: 20 }}

                        onClick={() => {
                            copyToNext();
                        }}
                        style={{ display: props.eventKey == props.Events.length - 1 ? 'none' : 'block' }}
                        className="addcontacts_btn"
                    >
                        {props.eventKey}  Copy to Next Event{props.Events.length - 1}
                        <FaArrowRight />
                    </Button>
                </Row>
                <Button
                    variant="outline-primary"
                    style={{
                        float: "right",
                        width: "20%",
                        borderRadius: 20,
                        marginTop: 50,
                    }}
                    className="addcontacts_btn"
                    onClick={() => { props.open(false) }}
                >Close</Button>
                <Button
                    variant="primary"
                    style={{
                        float: "right",
                        width: "20%",
                        borderRadius: 20,
                        marginTop: 50,
                    }}
                    className="addcontacts_btn"
                    onClick={() => {
                        props.eventKey == props.Events.length - 1
                            ? props.open(false)
                            : props.setKey(parseInt(props.eventKey) + 1);
                    }}
                    disabled={props.isSaving}
                >
                    {props.isSaving === true ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Saving...</span>
                        </Spinner>
                    ) : (
                        <>
                            {props.eventKey === props.Events.length - 1 ? (
                                "Save"
                            ) : (
                                <>
                                    Save
                                </>
                            )}
                        </>
                    )}
                </Button>
            </Container>
        </>
    );
}