import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControl,
  Paper,
  Modal,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./CreateEvent.css";
import AddImg from "../../../Assets/AddImage.svg";
import Scehedule from "../../../Assets/schedule.svg";
import Storyimg from "../../../Assets/AddStory.svg";
import Albumsimg from "../../../Assets/gallery.svg";
import Map from "../../Helpers/Maps/Maps";
import CancelIcon from "@material-ui/icons/Cancel";
import Album from "../Extras/Album";
import Story from "../Extras/Story";
import AddSchedule from "../Extras/Schedule";
import ImageSelectionModal from "./ImageSelectionModal";
import AddDetails from "../AddDetails/AddDetails";
import { editform } from "../../../Redux/DispatchFuncitons/EventCreationFormFunction";
import { SAVEFORM } from "../../../Redux/Actions/EventCreationFormActions";
import { useDispatch } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
export default function EventDetails(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      // borderColor: "#3897f1 !important",
      borderRadius: "150px",
      color: "#3897f1 !important",
      fontSize: "12px !important",
    },
  }));

  const classes = useStyles();

  const [processing, setProcessing] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [CurrentEventDetails, SetCurrentEventDetails] = useState({
    ...props.Events[props.SelectedEvent],
  });
  const [IsSubmitted, setSubmit] = useState(false);
  const [shedulevisible, SetScheduleVisible] = useState(false);
  const [storyvisible, SetStoryVisible] = useState(false);
  const [albumvisible, SetAlbumVisible] = useState(false);
  const [Link, setLink] = useState("");
  const [Location, setLocation] = useState("");
  const [isEditLocation, setisEditLocation] = useState(false);
  const [address, setaddress] = useState("");
  useEffect(() => {
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }
  }, []);
  useEffect(() => {
    debugger;
    props.setDisablesave(false);
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }

    if (
      CurrentEventDetails !== {} &&
      CurrentEventDetails.Location !== undefined
    ) {
      if (CurrentEventDetails.Location === "") {
        setaddress("");
      } else {
        try {
          if (JSON.parse(CurrentEventDetails.Location === {})) {
            throw "unwanted";
          } else {
            setaddress(JSON.parse(CurrentEventDetails.Location).address);
            setLocation(JSON.parse(CurrentEventDetails.Location).address);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setaddress("");
    }
  }, [props.SelectedEvent]);

  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "271872414479-lumfn9dkcqh1k1et8dfau81dkcng81s4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCdk1XolxNow08BXLxbzCeDReSrNTTlXCo";
  var clientSecret = "GpxXOinOWEyYdsbnVjolU9is";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const save = async () => {
    let eventscpy = props.Events;
    let currentEvent = props.SelectedEvent;
    console.log(CurrentEventDetails);
    eventscpy[props.SelectedEvent] = CurrentEventDetails;

    await props.setEvents(eventscpy);
    // await props.SelectEvent(0);

    let result = await props.checkIfEventEmpty(
      eventscpy,
      props.Type,
      props.seterroring,
      props.SelectedEvent
    );
    await setSubmit(true);
    if (result.status === true && props.Type !== "") {
      let EventsCopy = [...props.Events];
      await props.setDisablesave(true);

      props.handleNext();
    } else {
      console.log("result false");
      console.log(IsSubmitted);
      await props.SelectEvent(result.index);
      console.log(result.index);
    }
  };

  const changevenue = () => {
    if (
      CurrentEventDetails.VenueType === "Online" ||
      CurrentEventDetails.VenueType === "Both"
    ) {
      // CreateMeeting();
      SetCurrentEventDetails({
        ...CurrentEventDetails,
        Location: "",
      });
    }
  };
  const dispatch = useDispatch();

  // const updatereduxform = async (data) => {
  //   await dispatch({
  //     type: SAVEFORM,
  //     payload: data,
  //   });
  // };

  return (
    <Grid container spacing={1} className="p-15px pt-0">
      <Grid item xs={12} sm={12}>
        {CurrentEventDetails !== undefined &&
          CurrentEventDetails.file === "" ? (
          <center>
            <img
              src={AddImg}
              className={
                IsSubmitted === true ? "add-Img error-box" : "add-Img "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
            />
          </center>
        ) : CurrentEventDetails !== undefined &&
          CurrentEventDetails.filetype !== undefined ? (
          CurrentEventDetails.filetype === "png" ||
            CurrentEventDetails.filetype === "jpg" ||
            CurrentEventDetails.filetype === "jpeg" ? (
            <img
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              className={
                processing === true
                  ? "transparent uploaded-file w-100 "
                  : "notTransparent uploaded-file w-100 "
              }
            />
          ) : (
            <video
              muted
              type="video/mp4"
              autoPlay={true}
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              preload="none"
              className={
                processing === true
                  ? " transparent w-100 "
                  : "notTransparent w-100 "
              }
            />
          )
        ) : (
          <></>
        )}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={showPopup}
            onClose={() => {
              toggleShowPopup(false);
            }}
          >
            <div className="modal-card">
              <CancelIcon
                onClick={() => {
                  toggleShowPopup(false);
                }}
                color="secondary"
                className="popup-close"
                fontSize="large"
                style={{ bottom: "10px", position: "inherit" }}
              />

              <ImageSelectionModal
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                processing={processing}
                setDisablesave={props.setDisablesave}
                CurrentEventDetails={CurrentEventDetails}
                SetCurrentEventDetails={SetCurrentEventDetails}
                show={toggleShowPopup}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      <Grid item xs={12}>
        <span className="label">Enter Event Name</span>
        <TextField
          placeholder="Name"
          id="outlined-basics"
          variant="outlined"
          className="w-100-p "
          size="small"
          value={CurrentEventDetails.Name}
          onChange={async (e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Name: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Name === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>

      <Grid item xs={5}>
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
          value={CurrentEventDetails.Time}
          onChange={(e) => {
            console.log(e.target.value);
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Time: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Time === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={7}>
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
          className="w-100-p "
          value={
            CurrentEventDetails.Date === ""
              ? "01-01/2020"
              : CurrentEventDetails.Date
          }
          placeholder="DD-MM-YY"
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Date: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Date === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ fontSize: "12px" }}
        />
      </Grid>
      <Grid item xs={5}>
        <FormControl
          variant="outlined"
          className="w-100-p "
          size="small"
          variant="outlined"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <span className="label">Type</span>
          <Select
            className="w-100-p selectboxblue"
            value={CurrentEventDetails.VenueType}
            error={
              IsSubmitted === true && CurrentEventDetails.VenueType === ""
                ? true
                : false
            }
            variant="outlined"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Online-Inapp",
                });
              }}
              value="Online-Inapp"
            >
              Online-Inapp
            </MenuItem>
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Online",
                });
              }}
              value="Online"
            >
              Online
            </MenuItem>

            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Offline",
                });
              }}
              value="Offline"
            >
              Offline
            </MenuItem>
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Both",
                });
              }}
              value="Both"
            >
              Both
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <>
        <Grid
          item
          xs={7}
          className={
            CurrentEventDetails.VenueType === "Offline" ? "hide" : "show"
          }
        >
          <span className="label "> Link </span>
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            className="w-100-p "
            placeholder="Add Link Below"
            value={
              CurrentEventDetails.VenueType === "Online" ||
                CurrentEventDetails.VenueType === "Both"
                ? CurrentEventDetails.Link
                : "Meeting Created"
            }
            disabled={
              CurrentEventDetails.VenueType === "Online" ||
                CurrentEventDetails.VenueType === "Both"
                ? false
                : true
            }
            onChange={(e) => {
              SetCurrentEventDetails({
                ...CurrentEventDetails,
                Link: e.target.value,
                Location: "",
              });
            }}
            error={
              IsSubmitted === true && CurrentEventDetails.Link === ""
                ? true
                : false
            }
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={CurrentEventDetails.VenueType === "Offline" ? 7 : 12}
          sm={CurrentEventDetails.VenueType === "Offline" ? 7 : 12}
          className={
            CurrentEventDetails.VenueType === "Online" ||
              CurrentEventDetails.VenueType === "Online-Inapp"
              ? "hide"
              : "show"
          }
        >
          {isEditLocation}
          {isEditLocation === true ? (
            <>
              <Map
                SetCurrentEventDetails={SetCurrentEventDetails}
                CurrentEventDetails={CurrentEventDetails}
                center={{ lat: 20.5937, lng: 78.9629 }}
                height="300px"
                zoom={12}
                setLocation={setLocation}
                Location={Location}
                type={"Offline"}
                setisEditLocation={setisEditLocation}
                setaddress={setaddress}
              />
            </>
          ) : (
            <Grid container spacing={0} style={{ width: "100%" }}>
              <Grid xs={12}>
                <span className="label " style={{ width: "100%" }}>
                  Location
                </span>
              </Grid>
              <Grid xs={12}>
                <div
                  className="fs-14"
                  onClick={() => setisEditLocation(true)}
                  style={{
                    width: "100%",
                    border: "Solid 2px #3897f1",
                    borderRadius: "150px",
                    padding: "8px",
                    position: 'relative',
                    bottom: '6px'
                  }}
                >
                  {Location === ""
                    ? "Please Enter A location"
                    : Location.length > 25
                      ? Location.substring(0, 25)
                      : Location}
                </div>
              </Grid>
            </Grid>
          )}
          <span
            className={
              IsSubmitted === true && CurrentEventDetails.Location === ""
                ? "error"
                : "hide"
            }
            style={{ width: '100%' }}
          >
            Please add Location
          </span>
        </Grid>
        <Grid
          item
          xs={isEditLocation === true ? 1 : false}
          sm={isEditLocation === true ? 1 : false}
          className={
            CurrentEventDetails.VenueType === "Online" ||
              CurrentEventDetails.VenueType === "Online-Inapp"
              ? "hide"
              : "show"
          }
        >
          {isEditLocation === true ? (
            <SaveIcon
              onClick={() => {
                setisEditLocation(false);
              }}
              style={{ position: "relative", top: "30px", color: "green" }}
            />
          ) : (
            <></>
          )}
        </Grid>
      </>

      <Grid item xs={12}>
        <span className="label">Description</span>
        {/* <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric"
          }}
        /> */}
        <TextField
          id="outlined-basic"
          // label="Description"
          size="small"
          variant="outlined"
          className="w-100-p   "
          value={CurrentEventDetails.Description}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Description: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Description === ""
              ? true
              : false
          }
          // InputProps={{
          //   classes: {
          //     notchedOutline: classes.notchedOutline,
          //   },
          // }}
          multiline={true}
          rows={2}
        />
      </Grid>
      {/* <Grid item xs={8} className="talc fs-bold m-b-25px label">
        Guest can Invite (max 3)
      </Grid>
      <Grid item xs={4}>
        <Switch
          checked={CurrentEventDetails.GuestInvite}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
          className="fr"
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              GuestInvite: !CurrentEventDetails.GuestInvite,
            });
          }}
        />
      </Grid> */}
      <Grid
        item
        xs={props.SelectedEvent === 0 ? 4 : 12}
        md={props.SelectedEvent === 0 ? 4 : 12}
      >
        <Paper
          elevation={3}
          className="schedule-card"
          onClick={() => {
            SetScheduleVisible(true);
          }}
        >
          <center>
            <img src={Scehedule} alt="schedule" className="schedule-icon" />

            <button className="add-schedule theme-font">Schedule</button>
          </center>
        </Paper>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="f-s-modal"
            open={shedulevisible}
            onClose={() => {
              SetScheduleVisible(false);
            }}
          >
            <div className="f-s-modal-card">
              <AddDetails
                Name="Schedule"
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                CurrentEventDetails={CurrentEventDetails}
                Events={props.Events}
                SelectedEvent={props.SelectedEvent}
                SetCurrentEventDetails={SetCurrentEventDetails}
                SetScheduleVisible={SetScheduleVisible}
                open={SetScheduleVisible}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      {props.SelectedEvent === 0 ? (
        <>
          <Grid item xs={4} md={4}>
            <Paper
              elevation={3}
              className="schedule-card"
              onClick={() => {
                SetStoryVisible(true);
              }}
            >
              <center>
                <img src={Storyimg} alt="schedule" className="schedule-icon" />

                <button className="add-schedule theme-font">Story</button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="f-s-modal"
                open={storyvisible}
                onClose={() => {
                  SetStoryVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Story"
                    className="modal-component"
                    data={props.Events}
                    setEvents={props.setEvents}
                    SelectEvent={props.SelectEvent}
                    SelectedEvent={props.SelectedEvent}
                    CurrentEventDetails={CurrentEventDetails}
                    Events={props.Events}
                    SelectedEvent={props.SelectedEvent}
                    SetCurrentEventDetails={SetCurrentEventDetails}
                    SetScheduleVisible={SetScheduleVisible}
                    open={SetStoryVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={4} md={4}>
            <Paper
              elevation={3}
              className="schedule-card"
              onClick={() => {
                SetAlbumVisible(true);
              }}
            >
              <center>
                <img src={Albumsimg} alt="schedule" className="schedule-icon" />

                <button className="add-schedule theme-font">Albums</button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="f-s-modal"
                open={albumvisible}
                onClose={() => {
                  SetAlbumVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Album"
                    className="modal-component"
                    data={props.Events}
                    setEvents={props.setEvents}
                    SelectEvent={props.SelectEvent}
                    SelectedEvent={props.SelectedEvent}
                    CurrentEventDetails={CurrentEventDetails}
                    Events={props.Events}
                    SelectedEvent={props.SelectedEvent}
                    SetCurrentEventDetails={SetCurrentEventDetails}
                    SetScheduleVisible={SetScheduleVisible}
                    open={SetAlbumVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
        </>
      ) : (
        <></>
      )}

      <Grid item xs={12}>
        <button
          className={
            props.disablesave === false
              ? "btn save-event "
              : "btn save-event  disabled"
          }
          onClick={() => {
            if (props.disablesave === false) {
              save();
            }
          }}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
}
