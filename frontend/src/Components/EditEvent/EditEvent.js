import React, { useState, useEffect, useCallback } from "react";
import "./EditEvent.css";
import Header from "../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Button } from "react-bootstrap";
import Map from "../Helpers/Maps/Places";
import AddImg from "../../Assets/AddImage.svg";
import { Grid, InputLabel, Select, FormControl } from "@material-ui/core";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Eventnamebox from "../AddEvent/CreateEvent/EventNameBox";
import history from "../../Utils/History";
import { json } from "body-parser";
import { update_events } from "../../Redux/DispatchFuncitons/Eventfunctions";
import { deletefile, uploadString } from "../../Utils/FileUpload_Download";
export default function EditEvent(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      borderColor: "lightgrey !important",
      borderRadius: "150px",
      color: "#3897f1 !important",
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const [base, setbase] = useState("");
  const [maincode, setmaincode] = useState("");
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const [isError, setisError] = useState(false);
  const [isfileChanged, setisfileChanged] = useState(false);
  const [changedfiles, setchangedfiles] = useState([
    { fileurl: "", ischanged: false, type: "" },
    { fileurl: "", ischanged: false, type: "" },
    { fileurl: "", ischanged: false, type: "" },
    { fileurl: "", ischanged: false, type: "" },
  ]);
  const [urltype, seturltype] = useState("");
  const [selectedEvent, setselectedEvent] = useState(null);
  const [_id, Set_id] = useState("");
  const [Type, SetType] = useState("Event");
  const [Eventdata, setEventdata] = useState([]);
  const [Fileurl, setFile] = useState("");
  const [Filetype, setFiletype] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [VenueType, setVenueType] = useState("");
  const [Link, setLink] = useState("");
  const [Location, setLocation] = useState("");
  const [address, setaddress] = useState("");
  const [Description, setDescription] = useState("");
  const [datacopy, setdatacopy] = useState([]);
  const [urls, seturls] = useState([]);
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents[props.match.params.id]
  );
  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );

  const [uniqueurl, setuniqueurl] = useState("")
  const checkIfEventEmpty = async () => {
    debugger;
    if (Type === "") {
      setisError(true);
      return 0;
    }
    console.log(Eventdata);
    let Eventcpy = [...Eventdata];
    let result = true;
    let incompleteeventnumber = null;
    //check for event first
    Eventcpy = { ...Eventdata[selectedEvent] };
    if (Eventcpy.Name === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.Date === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.Time === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.Description === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.VenueType === "") {
      setisError(true);
      return 0;
    } else if (
      Eventcpy.VenueType === "Both" &&
      (Eventcpy.Location === "" || Eventcpy.Link === "")
    ) {
      setisError(true);
      return 0;
    } else if (Eventcpy.VenueType === "Online" && Eventcpy.Link === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.VenueType === "Offline" && Eventcpy.Location === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.file === "") {
      setisError(true);
      return 0;
    } else if (Eventcpy.filetype === "") {
      setisError(true);
      return 0;
    }

    for (let i = 0; i < Eventdata.length; i++) {
      incompleteeventnumber = i;
      Eventcpy = { ...Eventdata[i] };
      if (Eventcpy.Name === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.Date === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.Time === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.Description === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.VenueType === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (
        Eventcpy.VenueType === "Both" &&
        (Eventcpy.Location === "" || Eventcpy.Link === "")
      ) {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.VenueType === "Online" && Eventcpy.Link === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.VenueType === "Offline" && Eventcpy.Location === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.file === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      } else if (Eventcpy.filetype === "") {
        setselectedEvent(i);
        setisError(true);
        return 0;
      }
    }

    // console.log({ status: true, selectedEvent: null, component: "" });
    setisError(false);
    return 1;
    // return { status: true, selectedEvent: null, component: "" };
  };

  useEffect(async () => {
    grabdata();
  }, []);

  async function grabdata() {
    await setselectedEvent(null);
    if (
      props.location.pathname ===
      "/MyEvents/Manage-Event/" +
      props.match.params.id +
      "/" +
      props.match.params.invno
    ) {
      await setEventdata(MyEvents);
      await setmaincode(MyEvents[0].MainCode);
      console.log(MyEvents[0].MainCode);
      await setdatacopy(JSON.stringify({ MyEvents }));
      await setbase("MyEvents");
      await SetType(MyEvents[0].InvId.Type);
      await grabUrsl(MyEvents)
    } else {
      await setEventdata(myInvitations);
      await setmaincode(myInvitations[0].MainCode);
      await setdatacopy(JSON.stringify({ myInvitations }));
      await setbase("inv");
      await SetType(myInvitations[0].InvId.Type);
      await grabUrsl(myInvitations)
    }

    await setselectedEvent(0);
  }
  useEffect(() => {
    console.log(Eventdata);
    if (Eventdata.length !== 0 && selectedEvent !== null) {
      setName(Eventdata[selectedEvent].Name);
      setFile(Eventdata[selectedEvent].file);
      setFiletype(Eventdata[selectedEvent].filetype);
      setDate(Eventdata[selectedEvent].Date);
      setTime(Eventdata[selectedEvent].Time);
      setVenueType(Eventdata[selectedEvent].VenueType);
      setLink(Eventdata[selectedEvent].Link);
      if (Eventdata[selectedEvent].Location !== "") {
        console.log(
          Eventdata[selectedEvent].Location.split(":")[3]
            .split('"}')[0]
            .split('"')[1]
        );

        setaddress(
          Eventdata[selectedEvent].Location.split(":")[3]
            .split('"}')[0]
            .split('"')[1]
        );
      }
      setLocation(Eventdata[selectedEvent].Location);
      setDescription(Eventdata[selectedEvent].Description);
    }
  }, [selectedEvent]);
  const addevent = () => {
    let events = {
      Name: "",
      Participants: [],
      file: "",
      filetype: "",
      Date: "",
      Time: "",
      VenueType: "Online",
      Location: "",
      Link: "",
      Description: "",
      GuestInvite: false,
      Host: "",
      Co_Host: [],
      Schedule: [],
    };
    let Eventdatacpy = [...Eventdata];
    if (Eventdatacpy.length < 4) {
      Eventdatacpy.push(events);
      setEventdata(Eventdatacpy);
    }
  };
  const removeevent = () => {
    let Eventdatacpy = [...Eventdata];
    if (Eventdatacpy.length > 1) {
      Eventdatacpy.pop();
      setEventdata(Eventdatacpy);
    }
  };
  const save = async () => {
    // console.log(Eventdata);
    // console.log(changedfiles);
    debugger
    await preserve(selectedEvent);
    let ischecked = await checkIfEventEmpty();
    if (ischecked === 0) {
      alert("something is missing");
    } else {
      let Eventdatacpy = [...Eventdata];

      //saveuploadedfiles

      //  uniqueurl = Type + Math.floor(100000 + Math.random() * 900000) + "/";
      for (let i = 0; i < Eventdatacpy.length; i++) {
        console.log(Eventdatacpy[i])
        console.log(changedfiles[i])
        if (changedfiles[i].ischanged === true) {
          alert("file at index " + i + " has changed");
          if (urls[i] === undefined) {
            alert("url not found")

            let newurl = await uploadString(
              changedfiles[i].fileurl,
              urltype + uniqueurl + "Event_image/" + i + Eventdatacpy[i].Name.replaceAll(" ", '')
            );
            Eventdatacpy[i].file = newurl;
            console.log(newurl);
          } else {
            alert("url  found")
            console.log("uploading file")
            let newurl = await uploadString(
              changedfiles[i].fileurl,
              urls[i]
            );
            Eventdatacpy[i].file = newurl;
            console.log(newurl);
            console.log(urls[i])
          }
        } else {
        }
      }

      await setEventdata(Eventdatacpy);
      console.log(Eventdata);
      dispatch(update_events(Type, Eventdata, maincode));
    }
  };

  const preserve = async (i) => {
    let Eventdatacpy = [...Eventdata];
    Eventdatacpy[selectedEvent].Name = Name;
    Eventdatacpy[selectedEvent].file = Fileurl;
    Eventdatacpy[selectedEvent].filetype = Filetype;
    Eventdatacpy[selectedEvent].Date = Date;
    Eventdatacpy[selectedEvent].Time = Time;
    Eventdatacpy[selectedEvent].VenueType = VenueType;
    Eventdatacpy[selectedEvent].Link = Link;
    Eventdatacpy[selectedEvent].Location = Location;
    Eventdatacpy[selectedEvent].Description = Description;
    await setEventdata(Eventdatacpy);
    await setselectedEvent(i);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setisfileChanged(true);
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }

    let type = acceptedFiles[0].type.split("/");
    setFiletype(type[1]);
    var reader = await new FileReader();
    reader.onload = async function () {
      let filedata = reader.result;
      await setFile(filedata);
      // uploadfile(filedata, type);
      // console.log(filedata, type);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  async function uploadfile(fileurl, type, selectedEvent) {
    debugger
    let changedfilescpy = [...changedfiles];
    console.log(selectedEvent);
    if (fileurl.includes("https://firebasestorage") || fileurl === "") {
      return false;
    }
    if (selectedEvent === null) {
      if (!changedfilescpy[0].fileurl.includes("https://firebasestorage")) {
        changedfilescpy[0].fileurl = fileurl;
        changedfilescpy[0].type = type;
        changedfilescpy[0].ischanged = true;
        changedfilescpy[0].selectedEvent = 0
      }

    } else {
      if (!changedfilescpy[selectedEvent].fileurl.includes("https://firebasestorage")) {
        changedfilescpy[selectedEvent].fileurl = fileurl;
        changedfilescpy[selectedEvent].type = type;
        changedfilescpy[selectedEvent].ischanged = true;
        changedfilescpy[selectedEvent].selectedEvent = selectedEvent
      }

    }
    console.log(changedfilescpy)
    await setchangedfiles(changedfilescpy);
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });
  async function grabUrsl(eventdata) {
    debugger
    let urlscpy = [];
    let fileurl = ""
    let unuls = ""
    eventdata.map((data, index) => {
      console.log(data.file)
      fileurl = data.file.split("https://firebasestorage.googleapis.com/v0/b/mobilly-invite.appspot.com/o/")[1].split("?")[0];
      fileurl = fileurl.replaceAll("%2F", "/");
      fileurl = fileurl.split("Mob-invited/")[1];
      console.log(fileurl);
      unuls = fileurl
      setuniqueurl(fileurl.split("/Event_image")[0].match(/\d+/g)[0]);
      seturltype(fileurl.split("/Event_image")[0].match(/[a-zA-Z]+/g)[0]);
      urlscpy.push(fileurl)
    })
    urlscpy = urlscpy.reverse()
    await seturls(urlscpy)
    console.log(urlscpy)
  }
  useEffect(async () => {
    await uploadfile(Fileurl, Filetype, selectedEvent, selectedEvent)
  }, [Fileurl])
  return (
    <div>
      {/* <Header /> */}
      <Container>
        <Row style={{ marginTop: 30, marginRight: 3, marginLeft: 3 }}>
          <p style={{ fontWeight: "bold", fontSize: 23 }}>
            <IoArrowBackCircleOutline
              size={40}
              onClick={() => {
                history.goBack();
              }}
            />
            Edit Events
          </p>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <FormControl
              variant="outlined"
              className="w-100-p  m-b-10 "
              size="small"
              variant="outlined"
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            >
              <Select
                native
                value={Type}
                onChange={(e) => SetType(e.target.value)}
                className="selectboxblue"
              >
                <option value={Type}>{Type}</option>
                {Type !== "Wedding" ? (
                  <option value="Wedding">Wedding</option>
                ) : (
                  <></>
                )}
                {Type !== "Birthday" ? (
                  <option value="Birthday">Birthday</option>
                ) : (
                  <></>
                )}
                {Type !== "Wedding Anniversary" ? (
                  <option value="Wedding Anniversary">
                    Wedding Anniversary
                  </option>
                ) : (
                  <></>
                )}
                {Type !== "Get Together" ? (
                  <option value="Get Together">Get Together</option>
                ) : (
                  <></>
                )}
                {Type !== "Formal Event" ? (
                  <option value="Formal Event">Formal Event</option>
                ) : (
                  <></>
                )}
              </Select>
              {IsSubmitted === true && Type === "" ? (
                <span className="error p-l-5px">please enter Type</span>
              ) : (
                <></>
              )}
            </FormControl>
          </Col>
          <Col xs={12} md={6}>
            <div className="noe r4vw ">
              <Grid container spacing={0}>
                <Grid item xs={false} sm={1} md={2} />
                <Grid item xs={7} sm={6} md={6} className="tal  mfs-12">
                  Number Of Events
                </Grid>
                <Grid item xs={5} sm={5} md={4}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <div className="Cirlce tar  fl">
                        <AddCircleOutlineIcon
                          className="l-blue-t"
                          fontSize="large"
                          onClick={() => {
                            addevent();
                          }}
                        />
                      </div>
                      <div className="white box  fl">{Eventdata.length}</div>
                      <div className="Cirlce tal  fl">
                        <RemoveCircleOutlineIcon
                          className="l-blue-t "
                          fontSize="large"
                          onClick={() => {
                            removeevent();
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Col>
        </Row>
        <Container>
          <Row>
            <Eventnamebox
              data={Eventdata}
              SelectedEvent={selectedEvent}
              SelectEvent={preserve}
            />
          </Row>
          <Row>
            <Col xs={12}>
              {Fileurl === "" ? (
                <center>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      src={AddImg}
                      className={"add-Img "}
                    // onClick={() => {
                    //   toggleShowPopup(true);
                    // }}
                    />{" "}
                  </div>
                </center>
              ) : Fileurl !== undefined && Filetype !== undefined ? (
                Filetype === "png" ||
                  Filetype === "jpg" ||
                  Filetype === "jpeg" ? (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      src={Fileurl}
                      className={"notTransparent uploaded-file w-100"}
                    />
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <video
                      muted
                      type="video/mp4"
                      autoPlay={true}
                      src={Fileurl}
                      preload="none"
                      className={"notTransparent w-100"}
                    />
                  </div>
                )
              ) : (
                <></>
              )}
              {IsSubmitted === true && Fileurl === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row>
            <span className="label">Name</span>
            <TextField
              id="outlined-basics"
              variant="outlined"
              className="w-100-p"
              size="small"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            {IsSubmitted === true && Name === "" ? (
              <span className="error p-l-5px">please enter Name</span>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <Col xs={6} md={6} className="p-5px">
              <span className="label">Time</span>
              <TextField
                id="time"
                // label="Time"
                variant="outlined"
                type="time"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                className="w-100-p "
                inputProps={{
                  step: 300, // 5 min
                }}
                ampm={false}
                value={Time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {IsSubmitted === true && Time === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
            <Col xs={6} md={6} className="p-5px">
              <span className="label">Date</span>
              <TextField
                id="date"
                // label="Date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                className="w-100-p"
                value={Date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {IsSubmitted === true && Date === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
            <Col xs={6} className="p-5px">
              <span className="label">Type</span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="w-100-p selectboxblue pob0"
                value={VenueType}
                variant="outlined"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                size="small"
              >
                <MenuItem
                  className="w-100-p"
                  onClick={(e) => {
                    setVenueType("Online-Inapp");
                  }}
                  value="Online-Inapp"
                >
                  Online-Inapp
                </MenuItem>
                <MenuItem
                  className="w-100-p"
                  onClick={(e) => {
                    setVenueType("Online");
                  }}
                  value="Online"
                >
                  Online
                </MenuItem>

                <MenuItem
                  className="w-100-p"
                  onClick={(e) => {
                    setVenueType("Offline");
                  }}
                  value="Offline"
                >
                  Offline
                </MenuItem>
                <MenuItem
                  className="w-100-p"
                  onClick={(e) => {
                    setVenueType("Both");
                  }}
                  value="Both"
                >
                  Both
                </MenuItem>
              </Select>
              {IsSubmitted === true && VenueType === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
            <Col
              xs={6}
              className="p-5px"
              style={{
                display:
                  VenueType === "Online" || VenueType === "Both"
                    ? "block"
                    : "none",
              }}
            >
              <span className="label">Change Links </span>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                className="w-100-p "
                value={Link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {IsSubmitted === true && Link === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
            <Col
              xs={VenueType === "Offline" ? 6 : 12}
              className="p-5px"
              style={{
                display:
                  VenueType === "Offline" || VenueType === "Both"
                    ? "block"
                    : "none",
              }}
            >
              <Map
                setLocation={setLocation}
                location={address}
                setaddress={setaddress}
                type={"Offline"}
              />
              {IsSubmitted === true && address === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
            <Col xs={12} className="p-5px">
              <span className="label">Description</span>
              <TextField
                id="outlined-basic"
                // label="Description"
                size="small"
                variant="outlined"
                className="w-100-p m-7px "
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {IsSubmitted === true && Description === "" ? (
                <span className="error p-l-5px">please Add File</span>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      <div className="update">
        <center>
          <Button
            variant="primary"
            className="update-buttons"
            onClick={() => {
              save();
              setIsSubmitted(true);
            }}
          >
            Update
          </Button>
          <Button
            variant="outline-danger"
            className="update-buttons"
            onClick={() => {
              //reload();
              history.goBack();
            }}
          >
            Cancel
          </Button>
        </center>
      </div>
    </div>
  );
}
