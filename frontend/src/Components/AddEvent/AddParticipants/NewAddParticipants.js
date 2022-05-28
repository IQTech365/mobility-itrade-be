
import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Switch, Modal } from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import { saveEvent } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../../Utils/FileUpload_Download";
import EventNameBox from "../CreateEvent/EventNameBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AddCode from "./AddCode";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
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
import { IoArrowBackCircleOutline } from "react-icons/io5";

import * as XLSX from "xlsx";
import { json } from "body-parser";
import Addformultiple from './Addformultiple'
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",

        backgroundColor: theme.palette.background.paper,
        border: "solid 1px grey",
    },
}));
export default function NewAddParticipants(props) {
    const classes = useStyles();
    const [eventKey, setKey] = useState(0);
    const dispatch = useDispatch();
    const Eventdata = useSelector((state) => state.Eventdata);
    let supported = "";
    let attribute = ["name", "tel"];
    const opts = { multiple: true };
    let Eventscpy = [...props.Events];
    const [EntryWay, setEntryWay] = useState("Contact");
    const [code, setCodes] = useState([]);
    const [isMobile, SetIsMobile] = useState(false);
    const [isSaving, setisSaving] = useState(false);
    const [openModal, setopenModal] = useState(false);
    const [participants, setParticipants] = useState([]);
    let Albumcpy = [];
    let Storycpy = [];
    useEffect(async () => {
        supported = "contacts" in navigator && "ContactsManager" in window;
        if (supported === true) {
            SetIsMobile(true);
        } else {
            SetIsMobile(false);
        }
    }, []);


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
            await saveparticipantsfromexcel(data)
        };
        fileReader.onerror = (error) => {
            console.log(error);
        };
    };

    const saveparticipantsfromexcel = async (d) => {
        debugger
        let result = d.map((cdata) => {
            if (cdata.Contact) {
                return cdata.Contact
            } else {
                return (cdata)
            }
        });
        for (let i = 0; i < result.length; i++) {
            if (typeof result[i] === "string") {
                if (result[i].startsWith("+")) {
                } else {
                    result[i] = "+91" + result[i];
                }
            } else {
                result[i] = "+91" + result[i];
            }

        }
        let particpantscpy = [...participants];
        particpantscpy[eventKey] = [...result];
        await setParticipants([...particpantscpy]);
        return 1;
    }
    const openContactPicker = async () => {
        try {
            let ldata = [];
            let number = "";
            const contacts = await navigator.contacts.select(attribute, opts);
            contacts.map(async (contact) => {
                await ldata.push(contact.tel[0])
            });
            await saverecipeients(ldata);
        } catch (err) {
            console.log(err);
        }
    };
    const saverecipeients = async (data) => {
        let particpantscpy = [...participants];
        let contactlist = [];
        let clist = [];
        data.map(contact => {
            clist.push(contact)
            if (typeof contact === "string") {
                if (contact.startsWith("+")) {
                } else {
                    contact = "+91" + contact;
                }
            } else {
                contact = "+91" + contact;
            }
            contact = contact.replaceAll(' ', '');
            contactlist.push(contact)
        })

        particpantscpy[eventKey] = [...contactlist];
        await setParticipants([...particpantscpy]);
    };
    const save = async () => {
        debugger;
        setisSaving(true);
        let EventCpy = [...props.Events];
        if (participants.length === 0 && EntryWay !== 'Code') {
            setisSaving(false);
            return false;
        }
        let particpantsCpy = [...participants];
        particpantsCpy.map((listdata, index) => {
            if (listdata.length === 0) {
                alert("Please Add Guests to Event no " + (index + 1));
                setisSaving(false);
                return false;
            } else {
                EventCpy[index].Participants = listdata;
            }
        });
        await create_event();
    };
    const create_event = async () => {
        let uniqueurl =
            props.Type + Math.floor(100000 + Math.random() * 900000) + "/";
        let EventCpy = [...props.Events];
        let MainCode = "";
        for (let i = 0; i < EventCpy.length; i++) {
            let furl =
                uniqueurl + "Event_image/" + i + EventCpy[i].Name.replaceAll(" ", "");
            let url = await uploadString(EventCpy[i].file, furl);
            EventCpy[i].file = url;
        }
        await props.setEvents(EventCpy);
        if (Eventdata && Eventdata.ALBUM && Eventdata.ALBUM.length > 0) {
            Albumcpy = [];
            for (let i = 0; i < Eventdata.ALBUM.length; i++) {
                let shurl = uniqueurl + "Album/" + i + "." + Eventdata.ALBUM[i].type;

                let url = await uploadString(Eventdata.ALBUM[i].data, shurl);
                Eventdata.ALBUM[i].file = url;
                await Albumcpy.push({ file: url, type: Eventdata.ALBUM[i].type });
            }
        }
        if (Eventdata && Eventdata.STORY && Eventdata.STORY.length > 0) {
            Storycpy = [];
            for (let i = 0; i < Eventdata.STORY.length; i++) {
                let shurl = uniqueurl + "Story/" + i + "." + Eventdata.STORY[i].type;

                let url = await uploadString(Eventdata.STORY[i].file, shurl);
                Eventdata.STORY[i].file = url;
                await Storycpy.push({
                    ...Eventdata.STORY[i],
                    file: url,
                    type: Eventdata.STORY[i].type,
                });
            }
        }
        await dispatch(
            saveEvent({
                Type: props.Type,
                Events: EventCpy,
                Album: Albumcpy,
                Story: Storycpy,
                code: code,
                EntryWay: EntryWay,
            })
        );
        setisSaving(false);
    };
    return (<>
        <Modal

            className="f-s-modal"
            open={openModal}
        >
            <div className="f-s-modal-card">
                <Addformultiple
                    Name="Schedule"
                    className="modal-component"
                    open={setopenModal}
                    participants={participants}
                    eventKey={eventKey}
                    setParticipants={setParticipants}
                    setKey={setKey}
                    Events={props.Events}
                    isMobile={isMobile}
                    openContactPicker={openContactPicker}
                    saveparticipantsfromexcel={saveparticipantsfromexcel}
                    isSaving={isSaving}

                />
            </div>

        </Modal>
        <Grid container spacing={0}>

            {isSaving === true ? <CircularProgress className="Progress" /> : <></>}
            <img src={Access} className="access-logo " />
            <b className="tac w-100 b theme-font ">
                Give access to your guest or Upload CSV with for group access
            </b>
            <Grid item xs={12}>
                <p className="w-100 tac theme-font">
                    <b>
                        <u>Note</u>
                    </b>
                    :{"CSV can only be accessed by using website "}
                </p>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                    <button
                        className=" btn custom-file-upload t-white l-blue mt-5px"
                        style={{ display: isMobile === true ? "block" : "none" }}
                        onClick={() => {
                            if (props.Events.length === 1) {
                                openContactPicker();
                            } else {
                                setopenModal(true)
                            }

                        }}
                    >
                        PhoneBook
                    </button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <label
                        htmlfor="input1"
                        className="btn excel-file-upload  t-white l-blue mt-5px"
                        style={{ display: isMobile === false ? "block" : "none" }}
                        onClick={(e) => {
                            if (props.Events.length > 1) {
                                alert("clicked>")
                                console.log("done 2")
                                e.preventDefault();
                                setopenModal(true);
                            } else {
                                alert("clicked<")
                            }
                        }}
                    >
                        {props.Events.length === 1 ? " Upload Excel" : "Add Participants"}

                    </label>
                    <input
                        type="file"
                        id="input1"
                        className="upload-excel mt-10px"

                        onChange={(e) => {
                            if (props.Events.length < 2) {
                                readExcel(e.target.files[0]);
                                console.log("done 1")
                            }
                        }}
                        style={{ display: isMobile === false ? "block" : "none" }}
                        multiple={false}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <AddCode
                    Events={props.Events}
                    code={code}
                    setCodes={setCodes}
                    setEntryWay={setEntryWay}
                />
            </Grid>
            <Grid item xs={6}>
                <button
                    className="btn next mt-10px t-blue"
                    onClick={() => {
                        props.handleBack();
                    }}
                >
                    Back
                </button>
            </Grid>
            <Grid item xs={6}>
                <button
                    className="btn next mt-10px l-blue t-white p-5px"
                    onClick={() => {
                        save();
                    }}
                >
                    Next
                </button>
            </Grid>
        </Grid ></>
    )
}
