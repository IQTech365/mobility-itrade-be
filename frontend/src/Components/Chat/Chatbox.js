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
import { useSelector, useDispatch } from "react-redux";
import { url } from "../../Utils/Config";
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { uploadString } from "../../Utils/FileUpload_Download";
import SendIcon from "@material-ui/icons/Send";
import { useDropzone } from "react-dropzone";
import UserDatajustUrl from "../Helpers/UserData/UserDatajustUrl";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { getChats } from "../../Redux/DispatchFuncitons/Chatgroupfunctions";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "96%",
    marginLeft: "1%",
    background: " #f5f0f0",
    borderRadius: "500px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Chatbox(props) {
  const classes = useStyles();
  const [chats, setchat] = useState([]);
  const Auth = useSelector((state) => state.Auth);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }

    let type = acceptedFiles[0].type.split("/");
    type = type[1];
    var reader = await new FileReader();
    reader.onload = async function () {
      let url = props.SelectedGroup.room + "/" + Date.now() + "." + type;
      // console.log(url);
      let filedata = await uploadString(reader.result, url);
      props.sendImage({
        sender: Auth.Phone,
        type: "image",
        content: filedata,
        room: props.SelectedGroup.room,
        _id: props.SelectedGroup._id,
      });
      console.log({
        sender: Auth.Phone,
        type: "image",
        content: filedata,
        room: props.SelectedGroup.room,
        _id: props.SelectedGroup._id,
      });
    };
    reader.onerror = function (error) {
      // console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, ",
  });
  useEffect(async () => {
    const interval = setInterval(() => {
      if (props.SelectedGroup._id !== "") {
        getChats(props.SelectedGroup._id);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(async () => {
    props.setIsSubmit(false);
  }, [props.SelectedGroup.chats, props.IsSubmit]);

  const getChats = (_id) => {
    axios
      .post(url + "chatgroup/getchat", { _id: _id })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          setchat(response.data.chatdata);
          console.log(response.data.chatdata);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <Grid container spacing={0} className="h100">
      <Grid item xs={12} className="h7 white">
        <List className="p-0 m-0">
          <ListItem className=" m-0">
            {props.fullscreen === false ? (
              <IconButton
                onClick={() => {
                  props.setshow(0);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            ) : (
              <></>
            )}
            {props.SelectedGroup !== "" ? (
              props.SelectedGroup.Type === "GRP" ? (
                <>
                  <ListItemIcon>
                    <Avatar src={props.SelectedGroup.GrpPhoto} />
                  </ListItemIcon>
                  <ListItemText>{props.SelectedGroup.Name}</ListItemText>
                </>
              ) : (
                <>
                  <ListItemAvatar>
                    <UserDatajustUrl
                      showIcon={true}
                      Phone={
                        props.SelectedGroup.Name === Auth.Phone ||
                          "+91" + props.SelectedGroup.Name === Auth.Phone
                          ? typeof props.SelectedGroup.Admin === "string" &&
                            props.SelectedGroup.Admin.toString().startsWith("+")
                            ? props.SelectedGroup.Admin
                            : "+91" + props.SelectedGroup.Admin
                          : typeof props.SelectedGroup.Name === "string" &&
                            props.SelectedGroup.Name.toString().startsWith("+")
                            ? props.SelectedGroup.Name.toString()
                            : "+91" + props.SelectedGroup.Name
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <UserDatajustUrl
                      showName={true}
                      Phone={
                        props.SelectedGroup.Name === Auth.Phone ||
                          "+91" + props.SelectedGroup.Name === Auth.Phone
                          ? typeof props.SelectedGroup.Admin === "string" &&
                            props.SelectedGroup.Admin.toString().startsWith("+")
                            ? props.SelectedGroup.Admin
                            : "+91" + props.SelectedGroup.Admin
                          : typeof props.SelectedGroup.Name === "string" &&
                            props.SelectedGroup.Name.toString().startsWith("+")
                            ? props.SelectedGroup.Name.toString()
                            : "+91" + props.SelectedGroup.Name
                      }
                    />
                  </ListItemText>
                </>
              )
            ) : (
              <></>
            )}
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} className="chat">
        {chats &&
          chats.map((chat) => (
            <>
              {chat.sender === Auth.Phone ? (
                <div className="sender">
                  {chat.type === "text" ? (
                    chat.content
                  ) : chat.type === "image" ? (
                    <img src={chat.content} className="chat-img" />
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div className="recieved">
                  {chat.type === "text" ? (
                    <>
                      <UserDatajustUrl showName={true} Phone={chat.sender} />
                      :
                      <br />
                      {chat.content}
                    </>
                  ) : chat.type === "image" ? (
                    <>
                      <UserDatajustUrl showName={true} Phone={chat.sender} />
                      :
                      <br />
                      <img src={chat.content} className="chat-img" />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </>
          ))}
      </Grid>

      <Grid
        item
        xs={12}
        className="inputbox"
        style={{ display: props.SelectedGroup !== "" ? "block" : "none" }}
      >
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <IconButton className={classes.iconButton} aria-label="menu">
              <AttachFileIcon className="tilt" />
            </IconButton>
          </div>

          <InputBase
            className={classes.input}
            placeholder="hi..."
            inputProps={{ "aria-label": "search google maps" }}
            value={props.text}
            onChange={(e) => {
              props.settext(e.target.value);
            }}
          />

          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
            onClick={() => {
              props.submit();
              props.settext("");
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
