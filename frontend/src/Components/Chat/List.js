import React, { useState, useEffect } from "react";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import history from "../../Utils/History";
import {
  Paper,
  InputBase,
  Tabs,
  IconButton,
  Tab,
  ListItemAvatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Popup from "../Helpers/Popups/Popup";
import SelectParticipant from "./SelectParticipant";
import UserDatajustUrl from "../Helpers/UserData/UserDatajustUrl";
const useStyles = makeStyles((theme) => ({
  tabroot: {
    flexGrow: 1,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
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
export default function CList(props) {
  const [value, setValue] = useState(0);
  const AllGroups = useSelector((state) => state.Chatdata.groups);
  const Auth = useSelector((state) => state.Auth);
  // console.log(Auth.Phone);
  const [show, setshow] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Groups, setGroups] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    let grpcopy = [];
    AllGroups.map((sgrpup) => {
      if (sgrpup.room.toString().startsWith(props.MainCode)) {
        grpcopy.push(sgrpup);
      }
    });
    setGroups(grpcopy);
  }, []);
  useEffect(() => {
    let grpcopy = [];
    AllGroups.map((sgrpup) => {
      if (sgrpup.room.toString().startsWith(props.MainCode)) {
        grpcopy.push(sgrpup);
      }
    });
    setGroups(grpcopy);
  }, [AllGroups]);
  return (
    <div className="h100 vlgrey">
      <Grid container spacing={0} className="h7 white">
        <Grid item xs={10} className="h7 white">
          <h2 className="chatheadertitle">
            {/* <ArrowBackIosIcon
              onClick={() => {
                // console.log(props.pushto);
                history.goBack();
              }}
            /> */}
            Chat
          </h2>
        </Grid>
        <Grid item xs={2}>
          <AddCircleOutlineIcon
            fontSize={"large"}
            color={"primary"}
            className="m-5px"
            onClick={() => {
              setshow(true);
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.tabroot}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            centered
          >
            <Tab label="Direct" />
            <Tab label="Group" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search for Participants"
              inputProps={{ "aria-label": "search google maps" }}
            />

            <IconButton
              color="default"
              className={classes.iconButton}
              aria-label="directions"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} className=" w-90-p">
          <List>
            {Groups.map((grp) => (
              <ListItem
                className=" m-5px"
                onClick={() => {
                  // console.log(grp);
                  props.setSelectedGroup(grp);
                  props.setchat(grp.chats);
                  props.updateName();
                  props.setshow(1);
                }}
              >
                {value === 1 && grp.Type === "GRP" ? (
                  <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={grp.GrpPhoto} />
                    </ListItemAvatar>
                    <ListItemText primary={grp.Name} />
                  </>
                ) : (
                  <></>
                )}
                {value === 0 && grp.Type === "INDV" ? (
                  <>
                    <ListItemAvatar>
                      <UserDatajustUrl
                        showIcon={true}
                        Phone={
                          grp.Name === Auth.Phone ||
                            "+91" + grp.Name === Auth.Phone
                            ? typeof grp.Admin === "string" &&
                              grp.Admin.toString().startsWith("+")
                              ? grp.Admin
                              : "+91" + grp.Admin
                            : typeof grp.Name === "string" &&
                              grp.Name.toString().startsWith("+")
                              ? grp.Name.toString()
                              : "+91" + grp.Name
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <UserDatajustUrl
                        showName={true}
                        Phone={
                          grp.Name === Auth.Phone ||
                            "+91" + grp.Name === Auth.Phone
                            ? typeof grp.Admin === "string" &&
                              grp.Admin.toString().startsWith("+")
                              ? grp.Admin
                              : "+91" + grp.Admin
                            : typeof grp.Name === "string" &&
                              grp.Name.toString().startsWith("+")
                              ? grp.Name.toString()
                              : "+91" + grp.Name
                        }
                      />
                    </ListItemText>
                  </>
                ) : (
                  <></>
                )}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Popup
        component={SelectParticipant}
        toggleShowPopup={setshow}
        showPopup={show}
        url={props.allparticipants}
        showall={value}
        MainCode={props.MainCode}
        Groups={Groups}
      />
    </div>
  );
}
