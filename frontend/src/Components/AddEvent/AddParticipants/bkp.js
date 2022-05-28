
import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Switch } from "@material-ui/core";
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
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import * as XLSX from "xlsx";
import { json } from "body-parser";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",

        backgroundColor: theme.palette.background.paper,
        border: "solid 1px grey",
    },
}));
export default function AddParticipants(props) {
    const classes = useStyles();
    const [key, setKey] = useState(0);
    const dispatch = useDispatch();
    const Eventdata = useSelector((state) => state.Eventdata);
    const [list, setlist] = useState([]);
    let supported = "";
    let attribute = ["name", "tel"];
    const opts = { multiple: true };
    let Eventscpy = [...props.Events];
    const [EntryWay, setEntryWay] = useState("Contact");
    const [code, setCodes] = useState([]);
    const [isMobile, SetIsMobile] = useState(false);
    const [selectedEvent, setselectedEvent] = useState(0);
    const [forallparticipants, setforallparticipants] = useState(true);
    const [isSaving, setisSaving] = useState(false);
    const [particpants, setParticipants] = useState([]);
    let Albumcpy = [];
    let Storycpy = [];
    useEffect(() => {
        let particpantscpy = [...particpants];
        if (particpantscpy[key] !== undefined) {
            setlist(particpantscpy[key]);
        } else {
            setlist([]);
        }

        // if (props.Events && props.Events.length > 1) {
        //     setforallparticipants(true)
        // } else {
        //     setforallparticipants(false)
        // }
    }, [key]);

    useEffect(async () => {
        supported = "contacts" in navigator && "ContactsManager" in window;
        if (supported === true) {
            SetIsMobile(true);
        } else {
            SetIsMobile(false);
        }
    }, []);

    const openContactPicker = async () => {
        try {
            let ldata = [];
            let number = "";
            const contacts = await navigator.contacts.select(attribute, opts);

            contacts.map(async (contact) => {
                contact.tel.map(async (numb) => {
                    await ldata.push(numb);
                });
            });
            await saverecipeients(ldata);
        } catch (err) {
            console.log(err);
            alert(err)
            setlist([err])
        }
    };

    const readExcel = (file) => {
        debugger;
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
            result = result.map((data) => {
                if (typeof data === "string") {
                    if (data.startsWith("+")) {
                    } else {
                        data = "+91" + data;
                    }
                } else {
                    data = "+91" + data;
                }
                let jdata = data;
                return jdata;
            });
            console.log(result);
            setlist([...result]);
            let particpantscpy = [...particpants];
            particpantscpy[key] = [...result];
            setParticipants([...particpantscpy]);
            console.log(particpantscpy);
        });
    };

    // async function readexcel(file) {
    //   await setEntryWay("Contact");
    //   let allcontacts = [];
    //   let rowdata = [];
    //   readXlsxFile(file).then(async (rows) => {
    //     await rows.map((row) => {
    //       allcontacts.push(row[0]);
    //     });
    //   });
    //   await saverecipeients(allcontacts, "Number");
    // }

    const saverecipeients = async (data) => {
        let particpantscpy = [...particpants];
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
        setlist([...clist])
        particpantscpy[key] = [...contactlist];
        setParticipants([...particpantscpy]);
    };

    const save = async () => {
        debugger;
        setisSaving(true);
        let EventCpy = [...props.Events];
        if (particpants.length === 0) {
            setisSaving(false);
            return false;
        }
        let particpantsCpy = [...particpants];
        particpantsCpy.map((listdata, index) => {
            if (listdata.length === 0) {
                alert("Please Add Guests to Event no " + (index + 1));
                setisSaving(false);
                return false;
            } else {
                EventCpy[index].Participants = listdata;
            }
        });
        console.log(EventCpy);
        await create_event();
    };
    const create_event = async () => {
        debugger;
        let uniqueurl =
            props.Type + Math.floor(100000 + Math.random() * 900000) + "/";
        let EventCpy = [...props.Events];
        let MainCode = "";
        for (let i = 0; i < EventCpy.length; i++) {
            //remove this code when adding "use code insted button"
            // if (EventCpy[i].Participants.length === 0) {
            //   return false;
            // }
            let furl =
                uniqueurl + "Event_image/" + i + EventCpy[i].Name.replaceAll(" ", "");

            // await console.log(furl);
            let url = await uploadString(EventCpy[i].file, furl);
            // await console.log(url);
            EventCpy[i].file = url;

            // if (EventCpy[i].Schedule.length > 0) {
            //   for (let j = 0; j < EventCpy[i].Schedule.length; j++) {
            //     let shurl =
            //       uniqueurl +
            //       "Schedule/" +
            //       j +
            //       EventCpy[i].Name +
            //       "." +
            //       EventCpy[i].Schedule[j].filetype;

            //     let url = await uploadString(EventCpy[i].Schedule[j].file, shurl);
            //     EventCpy[i].Schedule[i].file = url;
            //   }

            //   console.log(EventCpy[i].Schedule);
            // }
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
        console.log({
            Type: props.Type,
            Events: EventCpy,
            Album: Albumcpy,
            story: Storycpy,
        });

        console.log("dispatching");
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



    //   return (
    //     <Grid container spacing={0}>
    //       {save === true ? <CircularProgress className="Progress" /> : <></>}
    //       <img src={Access} className="access-logo " />
    //       <b className="tac w-100 b theme-font ">
    //         Give access to your guest or Upload CSV with for group access
    //       </b>
    //       <h2></h2>
    //       <Grid item xs={12}>
    //         <p className="w-100 tac theme-font">
    //           <b>
    //             <u>Note</u>
    //           </b>
    //           :{"CSV can only be accessed by using website "}
    //           {/* {isMobile === true
    //           ? "Select your Invitees. "
    //           : "Upload list of Invitees-watsapp numbers with their country code. "}
    //         Or <u>Generate Event Code</u> to Send invitation  */}
    //         </p>
    //       </Grid>
    //       {forallparticipants === true ? (
    //         <Grid container spacing={0}>
    //           <Grid item xs={12} sm={12}>
    //             <button
    //               className=" btn custom-file-upload t-white l-blue mt-5px"
    //               style={{ display: isMobile === true ? "block" : "none" }}
    //               onClick={() => {
    //                 openContactPicker();
    //               }}
    //             >
    //               PhoneBook
    //             </button>
    //           </Grid>
    //           <Grid item xs={12} sm={12}>
    //             <label
    //               for="input"
    //               className="btn excel-file-upload  t-white l-blue mt-5px"
    //               style={{ display: isMobile === false ? "block" : "none" }}
    //             >
    //               Upload Excel
    //             </label>
    //             <input
    //               type="file"
    //               id="input"
    //               className="upload-excel mt-10px"
    //               onChange={(e) => {
    //                 readexcel(e.target.files[0]);
    //               }}
    //               style={{ display: isMobile === false ? "block" : "none" }}
    //               multiple={false}
    //               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    //             />
    //           </Grid>
    //           {/* <Grid item xs={12} sm={12}>
    //             <button
    //               type="button"
    //               id="input"
    //               className=" viewlistbutton"
    //               onClick={() => {
    //                 console.log("s");
    //               }}
    //             >
    //               View List
    //             </button>
    //           </Grid>
    //           <Grid item xs={12} sm={12} md={12}>
    //             <List className={classes.root}>
    //               {list.map((listdata) => (
    //                 <ListItem>
    //                   <ListItemAvatar>
    //                     <Avatar>
    //                       <AccountCircleOutlinedIcon />
    //                     </Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText primary={listdata} secondary="" />
    //                 </ListItem>
    //               ))}
    //             </List>
    //           </Grid> */}
    //         </Grid>
    //       ) : (
    //         <SingleEventParticipants />
    //       )}

    //       <Grid item xs={12}>
    //         <AddCode
    //           Events={props.Events}
    //           code={code}
    //           setCodes={setCodes}
    //           setEntryWay={setEntryWay}
    //         />
    //       </Grid>
    //       <Grid item xs={6}>
    //         <button
    //           className="btn next mt-10px t-blue"
    //           onClick={() => {
    //             props.handleBack();
    //           }}
    //         >
    //           Back
    //         </button>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <button
    //           className="btn next mt-10px l-blue t-white p-5px"
    //           onClick={() => {
    //             create_event();
    //           }}
    //         >
    //           Next
    //         </button>
    //       </Grid>
    //     </Grid>
    //   );
    // }
    //
    const DeleteThisContact = (index) => {
        let particpantscpy = [...particpants];
        let Nextkey = parseInt(key) + 1;
        particpantscpy[key] = particpantscpy[key].filter((word, i) => index !== i);
        setlist(particpantscpy[key]);
        console.log(particpantscpy);
        setParticipants(particpantscpy);
    };

    const copyToNext = () => {
        if (list.length === 0) {
            alert("Please add contacts to this event Firts");
        } else {
            if (key < 3 && key < props.Events.length - 1) {
                let particpantscpy = [...particpants];
                let Nextkey = parseInt(key) + 1;
                particpantscpy[Nextkey] = particpantscpy[key];
                console.log(particpantscpy);
                setParticipants(particpantscpy);
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
                    activeKey={key}
                    onSelect={(k) => {
                        console.log(k);
                        setKey(k);
                    }}
                >
                    {props.Events &&
                        props.Events.map((eve, index) => (
                            <Tab eventKey={index} title={eve.Name.substring(1, 4) + "..."}>
                                <ListGroup style={{ margin: "auto" }} className="listitems_box">
                                    {particpants && particpants[key] && particpants[key].map((listdata, i) => (
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
                        isMobile === true ? (
                            <Button
                                variant="outline-primary"
                                className="addcontacts_btn"
                                style={{ margin: "auto", width: "30%", borderRadius: 20 }}
                                onClick={() => {
                                    openContactPicker();
                                }}
                            >
                                <BsFillPeopleFill /> Add Contacts
                            </Button>
                        ) : (
                            <>
                                <label
                                    htmlFor="input"
                                    className="addcontacts_btn btn btn-outline-primary"
                                    style={{ display: isMobile === false ? "block" : "none" }}
                                    style={{ margin: "auto", width: "30%", borderRadius: 20 }}
                                >
                                    <BsFillPeopleFill /> Add Contacts
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
                        )

                    }
                    <Button
                        variant="outline-primary"
                        style={{ margin: "auto", width: "30%", borderRadius: 20 }}
                        className="addcontacts_btn"
                        onClick={() => {
                            copyToNext();
                        }}
                    >
                        Copy to Next Event
                        <FaArrowRight />
                    </Button>
                </Row>

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
                        key === props.Events.length - 1
                            ? save()
                            : setKey(parseInt(key) + 1);
                    }}
                    disabled={isSaving}
                >
                    {isSaving === true ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Saving...</span>
                        </Spinner>
                    ) : (
                        <>
                            {key === props.Events.length - 1 ? (
                                "Save"
                            ) : (
                                <>
                                    Next <FaArrowRight />
                                </>
                            )}
                        </>
                    )}
                </Button>
            </Container>
        </>
    );
}
