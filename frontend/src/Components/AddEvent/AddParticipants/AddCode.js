import React, { useState, useEffect } from "react";

import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
export default function AddCode(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [codes, setCodes] = useState([]);
  const [usercode, setusercode] = useState([]);
  var codescpy = [];
  var usercodecpy = [];
  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  useEffect(() => {
    if (show === true && props.code.length !== props.Events.length) {
      for (var i = 0; i < props.Events.length; i++) {
        codescpy.push({
          Name: props.Events[i].Name,
          code: randomString(
            8,
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          ),
        });
        usercodecpy.push(codescpy[i].code);
      }
      console.log(codescpy);
      setCodes(codescpy);
      setusercode(usercodecpy);
    }
  }, [show]);
  return (
    <div>
      <button className=" next btn btn-dark mt-10px" onClick={handleShow}>
        Use Code
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ position: "absolute", top: "0vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Code For Public Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid style={{ padding: '5px' }}>
            <Row className="m-0 m-5px">
              <Col xs={5} md={3}>
                <b>Event Name</b>
              </Col>
              <Col xs={7} md={9}>
                <b>Event Code</b>
              </Col>
            </Row>
            <br />
            {codes.map((code, index) => (
              <Row className="m-0 mt-5px" key={code.code}>
                <Col xs={5} md={3} className="m-0 mt-5px">
                  {code.Name + ":"}
                </Col>
                <Col xs={7} md={9} className="m-0 mt-5px">
                  <Form.Control
                    disabled={true}
                    type="email"
                    placeholder="Enter email"
                    style={{ borderRadius: 20 }}
                    value={usercode[index]}
                    onChange={(e) => {
                      usercodecpy[index] = e.target.value;
                      setusercode(usercodecpy);
                    }}
                    maxLength={4}
                  />
                </Col>
              </Row>
            ))}
            <br />
            <Row className="m-0">
              <Button
                variant="success"
                style={{ borderRadius: 20, backgroundColor: "#3897f1" }}
                className="w-100 mt-10px"
                onClick={() => {
                  props.setEntryWay("Code");
                  props.setCodes(usercode);
                  handleClose(false);
                }}
              >
                Save
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
