import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItemAvatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Avatar,
  Grid,
} from "@material-ui/core";
import Userurl from "../Helpers/UserData/UserDatajustUrl";
import CancelIcon from "@material-ui/icons/Cancel";
import AddImg from "../../Assets/AddImage.svg";
import { creategroup } from "../../Redux/DispatchFuncitons/Chatgroupfunctions";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadString } from "../../Utils/FileUpload_Download";
export function Participant(props) {
  const Auth = useSelector((state) => state.Auth);
  return (
    <Grid container spacing={2} className="mt-10px ofh">
      <Grid item xs={12}>
        <h5>Select Contact</h5>
      </Grid>
      <List>
        {props.url.map((grp) =>
          grp !== Auth.Phone ? (
            <ListItem
              onClick={async () => {
                await props.setParticipants([grp]);
                console.log([grp]);
                await props.setgroupName(grp + "");
                await props.create();
              }}
            >
              <ListItemAvatar>
                <Userurl
                  Phone={grp.includes("+") ? grp : "+91" + grp}
                  showIcon={true}
                />
              </ListItemAvatar>
              <Userurl
                Phone={grp.includes("+") ? grp : "+91" + grp}
                showName={true}
              />
            </ListItem>
          ) : (
            <></>
          )
        )}
      </List>
    </Grid>
  );
}
export function CreateGroup(props) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0].size > 5259265) {
      alert("Max file size 5mb");
      return false;
    }

    let type = acceptedFiles[0].type.split("/");
    props.setgroupImagetype(type);
    var reader = await new FileReader();
    reader.onload = async function () {
      let fileurl = reader.result;
      props.setgroupImage(fileurl);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    await reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });
  const [groupName, setgroupName] = useState("");
  const [participants, setparticipants] = useState([...props.url]);
  function filterparticipant(grp) {
    let Participantcopy = [];
    Participantcopy = participants.filter((sParticipant, i) => {
      return sParticipant !== grp;
    });
    setparticipants(Participantcopy);
  }
  const Auth = useSelector((state) => state.Auth);

  return (
    <div>
      <h5> Create Group</h5>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          src={props.groupImage === "" ? AddImg : props.groupImage}
          style={{
            width: "200px",
            objectFit: "cover",
            height: "200px",
            borderRadius: "100%",
            margin: "10px",
            marginLeft: "50px",
          }}
        />
      </div>

      <TextField
        variant="outlined"
        color="primary"
        label="Group Name"
        size="small"
        className="w-100 mt-10px"
        value={props.groupName}
        onChange={(e) => {
          props.setgroupName(e.target.value);
        }}
      />
      <Grid container spacing={2} className="mt-10px ofh">
        <List>
          {props.url.map((grp) =>
            grp !== Auth.Phone ? (
              <ListItem
                onClick={async () => {
                  await props.setParticipants([...props.Participants, grp]);
                }}
              >
                <ListItemAvatar>
                  <Userurl
                    Phone={grp.includes("+") ? grp : "+91" + grp}
                    showIcon={true}
                  />
                </ListItemAvatar>
                <Userurl
                  Phone={grp.includes("+") ? grp : "+91" + grp}
                  showName={true}
                />
              </ListItem>
            ) : (
              <></>
            )
          )}
        </List>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className="w-100"
        onClick={async () => {
          await props.create();
          props.show(false);
        }}
      >
        Create Group
      </Button>
    </div>
  );
}

export default function SelectParticipant(props) {
  const [createGroup, setcreateGroup] = useState(props.showall);
  const [Participants, setParticipants] = useState([]);
  const [groupName, setgroupName] = useState("");
  const [groupImage, setgroupImage] = useState("");
  const [groupImagetype, setgroupImagetype] = useState("");
  const dispatch = useDispatch();

  const create = async () => {
    let fileurl = "";
    if (Participants.length > 0 && groupName !== "") {
      let participants = [...new Set(Participants)];
      await setParticipants(participants);
      console.log(
        groupName,
        props.MainCode + groupName,
        groupImage,
        createGroup === 0 ? "INDV" : "GRP"
      );
      if (groupImage !== "") {
        fileurl = await uploadString(
          groupImage,
          "Groups/" + props.MainCode + "/" + groupName + "." + groupImagetype
        );
        await setgroupImage(fileurl);
      }
      await dispatch(
        creategroup(
          groupName,
          props.MainCode + groupName,
          Participants,
          fileurl,
          createGroup === 0 ? "INDV" : "GRP"
        )
      );
      props.hide(false);
    } else {
      console.log(groupName);
      console.log(Participants);
    }
  };
  return (
    <div>
      {createGroup === 0 ? (
        <>
          <Participant
            url={props.url}
            setParticipants={setParticipants}
            setgroupName={setgroupName}
            create={create}
            show={props.hide}
          />
        </>
      ) : (
        <>
          <CreateGroup
            url={props.url}
            Participants={Participants}
            setParticipants={setParticipants}
            setgroupImage={setgroupImage}
            setgroupName={setgroupName}
            groupName={groupName}
            groupImage={groupImage}
            create={create}
            show={props.hide}
            setgroupImagetype={setgroupImagetype}
          />
        </>
      )}
    </div>
  );
}
