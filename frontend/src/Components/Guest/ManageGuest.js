import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Tab,
  Tabs,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import readXlsxFile from "read-excel-file";
import "../Guest/Guest.css";
import Header from "../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import history from "../../Utils/History";
import Userdataurl from "../Helpers/UserData/UserDatajustUrl";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import {
  change_event,
  update_participants,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
import * as XLSX from "xlsx";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
export default function ManageGuest(props) {
  const dispatch = useDispatch();
  const [isDisable, setDisabled] = useState(true);
  const [list, setlist] = useState([]);
  const [guestList, setguestList] = useState([]);
  const [isMobile, SetIsMobile] = useState(false);
  const [_id, Set_id] = useState("");
  const [Eventdata, setEventdata] = useState([]);
  let supported = "";
  const [base, setbase] = useState("");

  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents
  );
  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let attribute = ["name", "tel"];
  const opts = { multiple: true };

  useEffect(async () => {
    supported = "contacts" in navigator && "ContactsManager" in window;
    if (supported === true) {
      SetIsMobile(true);
    } else {
      SetIsMobile(false);
    }
  }, []);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      let result = d.map((data) => data.Contact);

      console.log(result);
      let Status = "";
      result = result.map((data) => {
        if (typeof data === "string") {
          if (data.includes("+")) {
          } else {
            data = "+91" + data;
          }
        } else {
          data = "+91" + data;
        }
        let jdata = { By: data, Status: Status };
        return jdata;
      });
      console.log(result);
      setguestList([...guestList, ...result]);
      setlist([...guestList, ...result]);
      setDisabled(false);
    });
  };

  useEffect(async () => {
    debugger;
    let Listcpy = [];
    let accept = [];
    let decline = [];
    let maybe = [];
    let RSVPList = []
    let all = [];
    let Participants = [];
    if (
      props.location.pathname ===
      "/MyEvents/Manage-GuestList/" +
      props.match.params.id +
      "/" +
      props.match.params.invno
    ) {
      await setEventdata(MyEvents[props.match.params.id]);
      await setbase("MyEvents");
      await Set_id(MyEvents[props.match.params.id][props.match.params.invno]._id);
      await setguestList(MyEvents[props.match.params.id][props.match.params.invno].RSVPList);
      RSVPList = MyEvents[props.match.params.id][props.match.params.invno].RSVPList;
      Participants = MyEvents[props.match.params.id][props.match.params.invno].Participants
    } else {
      await setEventdata(myInvitations[props.match.params.id]);
      await setbase("inv");
      await Set_id(myInvitations[props.match.params.id][props.match.params.invno]._id);
      await setguestList(myInvitations[props.match.params.id][props.match.params.invno].RSVPList);
      RSVPList = myInvitations[props.match.params.id][props.match.params.invno].RSVPList;
      Participants = MyEvents[props.match.params.id][props.match.params.invno].Participants
    }
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

    let allrsvp = accept.concat(decline);
    allrsvp = allrsvp.concat(maybe);
    let Status = "invited";
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
        }
      }

      if (Participants[j].toString().startsWith("+")) {
        Listcpy.push(Participants[j]);
        all.push({ By: Participants[j], Status: Status });
      } else {
        Listcpy.push("+91" + Participants[j]);
        all.push({ By: "+91" + Participants[j], Status: Status });
      }
      found = false;
    }
    setlist(all);
    setguestList(all);
  }, [MyEvents]);

  const deleteparticipant = async (by) => {
    let all = guestList;

    all = all.filter((allcontact) => {
      return by != allcontact.By;
    });
    console.log(all);
    await setguestList([]);
    await setguestList(all);
  };
  const removeall = () => {
    setguestList([]);
    setDisabled(false);
  };
  const openContactPicker = async () => {
    try {
      let ldata = [];
      let number = "";
      const contacts = await navigator.contacts.select(attribute, opts);

      contacts.map(async (contact) => {
        if (contact.tel.length > 1) {
          if (contact.tel[0].includes("+")) {
            await ldata.push(contact.tel[0]);
          } else {
            await ldata.push('+91' + contact.tel[0]);
          }


        } else {
          await ldata.push(contact.tel[0]);
        }
      });

      console.log(ldata);
      let Status = "";
      ldata = ldata.map((data) => {
        if (typeof data === "string") {
          if (data.startsWith("+")) {
          } else {
            data = "+91" + data;
          }
        } else {
          data = "+91" + data;
        }
        let jdata = { By: data, Status: Status };
        return jdata;
      });
      console.log(ldata);
      setguestList([...guestList, ...ldata]);
      setlist(ldata);
      setDisabled(false);
      await setlist([...ldata]);
      console.log(_id);
      let participants = [...ldata];
      // await dispatch(update_participants(_id, participants));
    } catch (err) {
      console.log(err);
    }
  };
  function save() {
    let listdata = [];
    guestList.map((data) => {
      listdata.push(data.By);
    });
    setguestList(guestList);
    setlist(guestList);
    setDisabled(true);
    console.log(listdata);
    dispatch(update_participants(_id, listdata));
  }
  function cancelchanges() {
    setguestList(list);
    setDisabled(true);
  }
  return (
    <>
      <div className="w-100 desktop-only ">
        <Header />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="delete-modal"
      >
        {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header> */}
        <Modal.Body>
          <p> Do You Want to Remove all Participants ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            Yes
          </Button>
          <Button onClick={handleClose} variant="success">
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="guest-box">
        <Row style={{ marginTop: 30, marginRight: 3, marginLeft: 3 }}>
          <p style={{ fontWeight: "bold", fontSize: 23 }}>
            <IoArrowBackCircleOutline
              size={40}
              onClick={() => {
                history.goBack();
              }}
            />
            Manage Guest
          </p>
        </Row>
        <Row className="m-1">
          <Col xs={false} md={6}></Col>
          <Col>
            <Button
              variant="danger"
              className="w-100 label"
              onClick={() => {
                removeall();
              }}
            >
              Remove All
            </Button>
          </Col>
          <Col>
            <Button
              variant="info"
              className="w-100 label"
              style={{ display: isMobile === true ? "block" : "none" }}
              onClick={() => {
                openContactPicker();
              }}
            >
              Add Participants
            </Button>
            <>
              <label
                htmlFor="input"
                className="btn btn-info label"
                style={{ display: isMobile === false ? "block" : "none" }}
              >
                Add Participants
              </label>
              <input
                id="input"
                type="file"
                accept=".xlsx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                }}
                placeholder="Add Participants"
                style={{ display: "none" }}
              />
            </>
          </Col>
        </Row>
        <Row style={{ marginLeft: "auto" }}>
          <Col>
            <ListGroup className="list-data">
              {guestList.map((guest, index) => (
                <ListGroup.Item className="m-1">
                  <Row className="m-0 ">
                    <Col xs={2} md={1}>
                      <Userdataurl
                        showIcon={true}
                        Phone={guest.By}
                        key={index}
                      />
                    </Col>
                    <Col xs={8} md={10}>
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
                          {guest.Status || ""}
                        </span>
                      </Row>
                    </Col>
                    <Col xs={2} md={1}>
                      <HighlightOffRoundedIcon
                        color="error"
                        fontSize="large"
                        onClick={() => {
                          setDisabled(false);
                          deleteparticipant(guest.By);
                        }}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              {/* {list.map((item) => (
                <ListGroup.Item className="m-1">
                  <Row className="m-0 ">
                    <Col xs={2} md={1}>
                      <Userdataurl showIcon={true} Phone={item} />
                    </Col>
                    <Col xs={8} md={10}>
                      <Row className="m-0 ">
                        <Userdataurl showName={true} Phone={item} />
                      </Row>
                      <Row className="m-0 "></Row>
                    </Col>
                    <Col xs={2} md={1}>
                      <HighlightOffRoundedIcon color="error" fontSize="large" />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))} */}
            </ListGroup>
          </Col>
        </Row>
        {isDisable === true ? (
          <></>
        ) : (
          <>
            <Button
              variant="danger"
              size="lg"
              className="fr label"
              onClick={() => {
                cancelchanges();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="fr label"
              onClick={() => {
                save();
              }}
            >
              Save
            </Button>
          </>
        )}
      </Container>
    </>
  );
}
