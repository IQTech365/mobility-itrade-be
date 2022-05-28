import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  InputBase,
  Divider,
  IconButton,
  ListItemAvatar,
} from "@material-ui/core";
import { url } from "../../Utils/Config";
import CList from "./List";
import Chatbox from "./Chatbox";
import "./Chat.css";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { updatechat } from "../../Redux/DispatchFuncitons/Chatgroupfunctions";
import NavMobile from '../Helpers/NavMobile/NavMobile'
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Chat(props) {
  const dispatch = useDispatch();
  const AllGroups = useSelector((state) => state.Chatdata.groups);
  let socketurl = url.split("api/");
  // console.log(socketurl);
  let socket = io(socketurl[0], { transports: ["websocket"] });
  const Auth = useSelector((state) => state.Auth);
  const [show, setshow] = useState(0);
  const [windowwidth, setwindowwidth] = useState(1280);
  const [fullscreen, setfullscreen] = useState(true);
  const [SelectedGroup, setSelectedGroup] = useState("");
  const [inroom, setinroom] = useState(false);
  let Eventdata = [];
  const [base, setbase] = useState("")
  let MyEvents = useSelector((state) => state.Eventdata.myEvents);
  let myInvitations = useSelector((state) => state.Eventdata.myInvitations);
  const [MainCode, setMainCode] = useState("");
  const [allparticipants, setallparticipants] = useState([]);
  const [chats, setchat] = useState([]);
  const [text, settext] = useState("");
  const [IndvName, setIndvName] = useState("");
  // console.log(MyEvents);
  const [IsSubmit, setIsSubmit] = useState(false);
  function handleResize() {
    setwindowwidth(window.innerWidth);
    // console.log(window.innerWidth);
    if (window.innerWidth > 959) {
      setfullscreen(true);
      // console.log(true);
    } else {
      setfullscreen(false);
      // console.log(false);
    }
  }
  useEffect(async () => {
    // console.log("/MyEvents/eventpage/chat/" + props.match.params.id);
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/eventpage/chat/" + props.match.params.id && MyEvents.length > 0
      ) {
        Eventdata = MyEvents[props.match.params.id];
        await setbase("MyEvents");
      } else if (
        props.location.pathname ===
        "/inv/eventpage/chat/" + props.match.params.id && myInvitations.length > 0
      ) {
        Eventdata = myInvitations[props.match.params.id];
        await setbase("inv");
      }
      let participants = [];
      Eventdata.map((singleevent) => {
        singleevent.Participants.map((participant) => {
          participants.push(participant);
          setMainCode(singleevent.MainCode);
        });
      });
      // console.log(participants);
      participants = [...new Set(participants)];
      setallparticipants(participants);
    }
  }, [myInvitations, MyEvents]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let selectedgrpcpr = SelectedGroup;
    let chat = [...chats];
    socket.on(
      "init",
      () => {
        socket.emit("connectit", { Phone: Auth.Phone });
        if (inroom === false) {
          // console.log("join rooms");
          socket.emit("rooms", { Phone: Auth.Phone });
          setinroom(true);
        }
      },
      ["abc"]
    );

    socket.on("joined", (rooms) => { });
    socket.once("msg_saved", (data) => {
      dispatch(updatechat(data, data.room));
    });
  });

  function submit() {
    socket.emit("message", {
      sender: Auth.Phone,
      content: text,
      type: "text",
      room: SelectedGroup.room,
      _id: SelectedGroup._id,
    });
    setIsSubmit(true);
  }
  function sendImage(data) {
    socket.emit("message", data);
    setIsSubmit(true);
  }
  const updateName = () => {
    if (SelectedGroup.Name && SelectedGroup.Type === "INDV") {
      if (
        SelectedGroup.Admin === Auth.Phone ||
        "+91" + SelectedGroup.Admin === Auth.Phone
      ) {
        if (typeof SelectedGroup.Name === "string") {
          if (SelectedGroup.Name.startsWith("+")) {
            setIndvName(SelectedGroup.Name);
          } else {
            setIndvName("+91" + SelectedGroup.Name);
          }
        } else {
          setIndvName("+91" + SelectedGroup.Name);
        }
      } else {
        if (typeof SelectedGroup.Admin === "string") {
          if (SelectedGroup.Admin.startsWith("+")) {
            setIndvName(SelectedGroup.Admin);
          } else {
            setIndvName("+91" + SelectedGroup.Admin);
          }
        } else {
          setIndvName("+91" + SelectedGroup.Admin);
        }
      }
    }
  };
  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={12}
        md={3}
        className={
          fullscreen === true ? "show h93" : show === 1 ? "hide" : "show h100"
        }
      >
        <CList
          MyEvents={MyEvents}
          pushto={"/" + base + "/eventpage/" + props.match.params.id}
          fullscreen={fullscreen}
          allparticipants={allparticipants}
          MainCode={MainCode}
          setSelectedGroup={setSelectedGroup}
          setshow={setshow}
          chats={chats}
          setchat={setchat}
          updateName={updateName}
          setIsSubmit={setIsSubmit}
          IsSubmit={IsSubmit}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        className={
          fullscreen === true ? "show h93" : show === 0 ? "hide" : "show h100"
        }
      >
        <Chatbox
          MyEvents={MyEvents}
          pushto={"/" + base + "/eventpage/" + props.match.params.id}
          fullscreen={fullscreen}
          allparticipants={allparticipants}
          MainCode={MainCode}
          setSelectedGroup={setSelectedGroup}
          setshow={setshow}
          chats={chats}
          setchat={setchat}
          updateName={updateName}
          submit={submit}
          text={text}
          settext={settext}
          SelectedGroup={SelectedGroup}
          sendImage={sendImage}
          setIsSubmit={setIsSubmit}
          IsSubmit={IsSubmit}
        />
      </Grid>
      <NavMobile base={base} id={props.match.params.id} />
    </Grid>
  );
}
