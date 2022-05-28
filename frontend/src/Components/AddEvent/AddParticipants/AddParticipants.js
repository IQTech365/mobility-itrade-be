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
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
    border: "solid 1px grey",
  },
}));
export default function AddParticipants(props) {
  const classes = useStyles();
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
  const [save, Setsave] = useState(false);
  let Albumcpy = [];
  let Storycpy = [];
  useEffect(async () => {
    supported = "contacts" in navigator && "ContactsManager" in window;
    if (supported === true) {
      SetIsMobile(true);
    } else {
      SetIsMobile(false);
    }
    if (props.Events && props.Events.length > 1) {
      setforallparticipants(true)
    } else {
      setforallparticipants(false)
    }

  }, []);

  const openContactPicker = async () => {
    try {
      let ldata = [];
      let number = "";
      const contacts = await navigator.contacts.select(attribute, opts);

      contacts.map(async (contact) => {
        await ldata.push(contact.tel[0]);
      });
      await saverecipeients(ldata, "Number");
    } catch (err) {
      console.log(err);
    }
  };
  async function readexcel(file) {
    await setEntryWay("Contact");
    let allcontacts = [];
    let rowdata = [];
    readXlsxFile(file).then(async (rows) => {
      await rows.map((row) => {
        allcontacts.push(row[0]);
      });
    });

    await saverecipeients(allcontacts, "Number");
  }

  const saverecipeients = async (data, type) => {
    let EventCpy = [...props.Events];
    if (forallparticipants === true) {
      await EventCpy.map(async (eve) => {
        eve.Participants = data;

        eve.authtype = type;
      });
    } else {
      await EventCpy.map((eve, index) => {
        if (index === selectedEvent) {
          eve.Participants = data;
          eve.authtype = type;
        }
      });
      // console.log(EventCpy);
    }
    if (selectedEvent + 1 < EventCpy.length) {
      setselectedEvent(selectedEvent + 1);
    }

    await setlist(EventCpy[0].Participants);
    console.log(list);
    await props.setEvents(EventCpy);
  };

  const create_event = async () => {
    debugger
    await Setsave(true);
    let uniqueurl =
      props.Type + Math.floor(100000 + Math.random() * 900000) + "/";

    let EventCpy = [...props.Events];
    let MainCode = "";
    for (let i = 0; i < EventCpy.length; i++) {
      let furl =
        uniqueurl +
        "Event_image/" +
        i +
        EventCpy[i].Name +
        "." +
        EventCpy[i].filetype;
      let url = await uploadString(EventCpy[i].file, furl);
      EventCpy[i].file = url;
    }
    await props.setEvents(EventCpy);
    if (Eventdata && Eventdata.ALBUM && Eventdata.ALBUM.length > 0) {
      Albumcpy = [];
      for (let i = 0; i < Eventdata.ALBUM.length; i++) {
        let shurl =
          uniqueurl +
          "Album/" +
          i +
          EventCpy[i].Name +
          "." +
          Eventdata.ALBUM[i].type;
        let url = await uploadString(Eventdata.ALBUM[i].data, shurl);
        Eventdata.ALBUM[i].file = url;
        await Albumcpy.push({ file: url, type: Eventdata.ALBUM[i].type });
      }
    }
    if (Eventdata && Eventdata.STORY && Eventdata.STORY.length > 0) {
      Storycpy = [];
      for (let i = 0; i < Eventdata.STORY.length; i++) {
        let shurl =
          uniqueurl +
          "Story/" +
          i +
          EventCpy[i].Name +
          "." +
          Eventdata.STORY[i].type;
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
  };

  function SingleEventParticipants() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12}>
          <EventNameBox
            data={props.Events}
            setEvents={props.setEvents}
            SelectEvent={setselectedEvent}
            SelectedEvent={selectedEvent}
            className="w-100"
          />
        </Grid>
        <Grid item xs={8} sm={8}></Grid>

        <Grid item xs={12} sm={12}>
          <button
            className="custom-file-upload"
            style={{ display: isMobile === true ? "block" : "none" }}
            onClick={async () => {
              await setEntryWay("Contact");
              await openContactPicker();
            }}
          >
            Add Participants
          </button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <label
            htmlFor="input"
            className="excel-file-upload"
            style={{ display: isMobile === false ? "block" : "none" }}
          >
            Add Participants
          </label>
          <input
            type="file"
            id="input"
            className="upload-excel"
            onChange={(e) => {
              readexcel(e.target.files[0]);
            }}
            style={{ display: isMobile === false ? "block" : "none" }}
            multiple={false}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={0}>
      {save === true ? <CircularProgress className="Progress" /> : <></>}
      <img src={Access} className="access-logo " />
      <b className="tac w-100 b theme-font ">
        Give access to your guest or Upload CSV with for group access
      </b>
      <h2></h2>
      <Grid item xs={12}>
        <p className="w-100 tac theme-font">
          <b>
            <u>Note</u>
          </b>
          :{"CSV can only be accessed by using website "}
        </p>
      </Grid>
      {forallparticipants === true ? (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <button
              className=" btn custom-file-upload t-white l-blue mt-5px"
              style={{ display: isMobile === true ? "block" : "none" }}
              onClick={() => {
                openContactPicker();
              }}
            >
              Add Participants
            </button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <label
              for="input"
              className="btn excel-file-upload  t-white l-blue mt-5px"
              style={{ display: isMobile === false ? "block" : "none" }}
            >
              Add Participants
            </label>
            <input
              type="file"
              id="input"
              className="upload-excel mt-10px"
              onChange={(e) => {
                readexcel(e.target.files[0]);
              }}
              style={{ display: isMobile === false ? "block" : "none" }}
              multiple={false}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Grid>
        </Grid>
      ) : (
        <SingleEventParticipants />
      )}

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
            create_event();
          }}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
}
