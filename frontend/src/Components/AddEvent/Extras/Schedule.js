import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    wordBreak: "break-word",
  },
}));
export default function AddSchedule(props) {
  const [subEvent, setSubevent] = useState([
    ...props.CurrentEventDetails.Schedule,
  ]);
  const [edit, setedit] = useState(false);
  const [add, setadd] = useState(true);
  const [editselected, settoedit] = useState(null);
  const [subname, setsubname] = useState("");
  const [venue, setvenue] = useState("");
  const [datetime, setdatetime] = useState("");
  const [description, setdescription] = useState("");
  const [isError, setError] = useState(false);
  const save = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        Venue: venue,
      };
      console.log([...subEvent, data]);

      await setSubevent([...props.CurrentEventDetails.Schedule, data]);

      var EventsCopy = { ...props.CurrentEventDetails };
      console.log(EventsCopy);
      EventsCopy.Schedule = [...props.CurrentEventDetails.Schedule, data];
      console.log(props.EventsCopy);
      await props.SetCurrentEventDetails(EventsCopy);
      // props.updatereduxform(EventsCopy);
      console.log(props.Events);
      Delete();
      setadd(false);
    } else {
      setError(true);
    }
  };
  const saveedit = async () => {
    if (subname !== "" && datetime !== "" && description !== "") {
      let data = {
        Name: subname,
        datetime: datetime,
        description: description,
        Venue: venue,
      };
      let subEventcpy = [...subEvent];
      subEventcpy[editselected] = data;
      await setSubevent(subEventcpy);
      var EventsCopy = { ...props.CurrentEventDetails };
      EventsCopy.Schedule = [...subEventcpy];
      console.log(props.EventsCopy);
      await props.SetCurrentEventDetails(EventsCopy);
      console.log(props.Events);
      // props.updatereduxform(EventsCopy);
      Delete();
      setedit(false);
      settoedit(null);
    } else {
      setError(true);
    }
  };
  const classes = useStyles();
  const Delete = () => {
    setsubname("");
    setdatetime("");
    setdescription("");
    setvenue("");
  };
  const Deleteone = async (i) => {
    let subeventcpy = [...subEvent];
    subeventcpy = subeventcpy.filter((sube, index) => {
      return index !== i;
    });
    await setSubevent([...subeventcpy]);

    var EventsCopy = { ...props.CurrentEventDetails };
    console.log(EventsCopy);
    EventsCopy.Schedule = [...subeventcpy];
    console.log(props.EventsCopy);
    await props.SetCurrentEventDetails(EventsCopy);
    // props.updatereduxform(EventsCopy);
    console.log(props.Events);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {subEvent.map((eve, index) => (
          <Grid item xs={12} className="card-shadow m-b-10 schedule-details">
            <Grid container spacing={0}>
              <Grid item xs={8} md={10}>
                {edit === true && editselected === index ? (
                  <>
                    <TextField
                      className="w-100 m-7px"
                      size="small"
                      label="Event Name"
                      onChange={(e) => {
                        setsubname(e.target.value);
                      }}
                      value={subname}
                    />

                    <form noValidate>
                      <TextField
                        id="datetime-local"
                        label="Schedule timing"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className="w-100 m-7px"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          setdatetime(e.target.value);
                        }}
                        value={datetime}
                      />
                    </form>
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      spacing={0}
                      className="padding-left-7 p-10-p "
                    >
                      <Grid item xs={12}>
                        <div className="ScheduleName l-blue-t m-0">
                          {eve.Name}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        {eve.Venue}
                      </Grid>
                      <Grid item xs={12} className="dtime">
                        {eve.datetime.split("T")[0] +
                          " " +
                          eve.datetime.split("T")[1]}
                      </Grid>
                      {/* <Grid item xs={12} className="mt-10px">
                        {eve.description}
                      </Grid> */}
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid item xs={4} md={2}>
                {edit === true && editselected === index ? (
                  <center>
                    <IconButton
                      onClick={() => {
                        saveedit();
                      }}
                    >
                      <CheckCircleOutlineIcon color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        Delete();
                      }}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </center>
                ) : (
                  <center>
                    <IconButton
                      onClick={() => {
                        setsubname(eve.Name);
                        setdatetime(eve.datetime);
                        setdescription(eve.description);
                        setvenue(eve.Venue);
                        setedit(true);
                        settoedit(index);
                        setadd(false);
                      }}
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        Deleteone(index);
                      }}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </center>
                )}
              </Grid>
              <Grid item xs={8} md={10}>
                {edit === true && editselected === index ? (
                  <TextField
                    className="w-100 m-7px"
                    variant="outlined"
                    size="small"
                    label="Sub-Event description"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    value={description}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item xs={4} md={2}>
                {/* <center>
                  {props.CurrentEventDetails.VenueType === "Online" ? (
                    <ControlPointIcon className="schedule-l-icon" />
                  ) : (
                    <LocationOnRoundedIcon className="schedule-l-icon" />
                  )}
                </center> */}
              </Grid>
            </Grid>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {eve.description.substring(0, 155)}...
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="p-10px">
                  {eve.description.substring(155, 10000000000000)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
      {add == true ? (
        <Grid item xs={12} className="card-shadow mb-100">
          <Grid container spacing={2}>
            <Grid item xs={7} md={10}>
              <TextField
                className="w-100 m-7px l-blue-t"
                size="small"
                label="Event Name"
                onChange={(e) => {
                  setsubname(e.target.value);
                }}
                value={subname}
                variant="standard"
                InputProps={{
                  className: "nounder",
                }}
              />

              <form noValidate>
                <TextField
                  id="datetime-local"
                  label="Schedule timing"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  className="w-100 m-7px"
                  variant="standard"
                  InputProps={{
                    className: "nounder",
                  }}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setdatetime(e.target.value);
                  }}
                  value={datetime}
                />
              </form>
              <TextField
                className="w-100 m-7px"
                variant="standard"
                InputProps={{
                  className: "nounder",
                }}
                size="small"
                label="Sub-Event description "
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                value={description}
              />
            </Grid>
            <Grid item xs={5} md={2}>
              <center>
                <IconButton
                  onClick={() => {
                    save();
                  }}
                >
                  <CheckCircleOutlineIcon
                    color="inherit"
                    fontSize={"large"}
                    style={{ color: "green" }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    Delete();
                    setadd(false);
                  }}
                >
                  <DeleteForeverIcon color="error" fontSize={"large"} />
                </IconButton>
              </center>
              {/* <center>
                {props.CurrentEventDetails.VenueType === "Online" ? (
                  <ControlPointIcon
                    className="schedule-l-icon"
                    fontSize={"large"}
                  />
                ) : (
                  <LocationOnRoundedIcon
                    className="schedule-l-icon"
                    fontSize={"large"}
                  />
                )}
              </center> */}
            </Grid>
            <Grid item xs={8} md={10}></Grid>
            <Grid item xs={4} md={2}></Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12} md={12}>
        <center>
          <AddCircleRoundedIcon
            onClick={() => {
              setadd(true);
              setedit(false);
              settoedit(null);
            }}
            fontSize="large"
            className="add-button  m-5px "
          />
        </center>
      </Grid>
      <Grid item xs={12} md={12}>
        <button
          class="save-Schedule  bottom"
          onClick={() => {
            props.SelectedEvent === 0
              ? props.SetName("Story")
              : props.SetScheduleVisible(false);
          }}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
}
