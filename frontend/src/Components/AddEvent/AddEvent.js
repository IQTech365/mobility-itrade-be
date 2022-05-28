import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import { Grid } from "@material-ui/core";
import HorizontalLinearStepper from "./Stepper/Stepper";
import CreateEvent from "./CreateEvent/CreateEvent";
import AddParticipants from "../AddEvent/AddParticipants/NewAddParticipants";
import Toggler from "../Helpers/EventInvitoggler/Toggler";
import BackNavBar from "../Helpers/BackNavbar/BackNavBar";
import Back from "../../Assets/Back.svg";
import history from "../../Utils/History";
import { useSelector } from "react-redux";
import Plan from "../Plan/Plan";
export default function AddEvent(props) {
  const [Type, setType] = useState("Wedding");
  const [activeStep, setActiveStep] = useState(0);
  const CreateEventForm = useSelector((state) => state.CreateEventForm);
  const [Events, setEvents] = useState([]);

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
  const [SelectedEvent, SelectEvent] = useState(0);
  const [Story, setStory] = useState([]);
  const [albumdata, setalbumdata] = useState([]);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const addAnEvent = async () => {
    if (Events.length < 4) {
      setEvents([...Events, events]);
    }
  };
  const removeAnEvent = async () => {
    let events = [...Events];
    if (events.length > 1) {
      events = events.slice(0, -1);
      await setEvents(events);
    }

    if (SelectedEvent > events.length - 1) {
      console.log(SelectedEvent - 1);
      SelectEvent(SelectedEvent - 1);
      console.log(SelectedEvent, events.length - 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkIfEventEmpty = async (eventscpy, Type, seterroring, index) => {
    if (Type === "") {
      seterroring(true);
      return { status: false, index: 0, component: "Type" };
    }
    console.log(Events);
    let Eventcpy = [...Events];
    let result = true;
    let incompleteeventnumber = null;
    //check for event first
    Eventcpy = { ...Events[index] };
    if (Eventcpy.Name === "") {
      console.log({ status: false, index: index, component: "Name" });
      return { status: false, index: index, component: "Name" };
    } else if (Eventcpy.Date === "") {
      console.log({ status: false, index: index, component: "Date" });
      return { status: false, index: index, component: "Date" };
    } else if (Eventcpy.Time === "") {
      console.log({ status: false, index: index, component: "Time" });
      return { status: false, index: index, component: "Time" };
    } else if (Eventcpy.Description === "") {
      console.log({ status: false, index: index, component: "Description" });
      return { status: false, index: index, component: "Description" };
    } else if (Eventcpy.VenueType === "") {
      console.log({ status: false, index: index, component: "VenueType" });
      return { status: false, index: index, component: "VenueType" };
    } else if (
      Eventcpy.VenueType === "Both" &&
      (Eventcpy.Location === "" || Eventcpy.Link === "")
    ) {
      console.log({
        status: false,
        index: index,
        component: "Both Location Link",
      });
      return { status: false, index: index, component: "Location" };
    } else if (Eventcpy.VenueType === "Online" && Eventcpy.Link === "") {
      console.log({ status: false, index: index, component: "Link" });
      return { status: false, index: index, component: "Location" };
    } else if (Eventcpy.VenueType === "Offline" && Eventcpy.Location === "") {
      console.log({ status: false, index: index, component: "Link" });
      return { status: false, index: index, component: "Location" };
    } else if (Eventcpy.file === "") {
      console.log({ status: false, index: index, component: "file" });
      return { status: false, index: index, component: "file" };
    } else if (Eventcpy.filetype === "") {
      console.log({ status: false, index: index, component: "filetype" });
      return { status: false, index: index, component: "filetype" };
    }

    for (let i = 0; i < Events.length; i++) {
      incompleteeventnumber = i;
      Eventcpy = { ...Events[i] };
      if (Eventcpy.Name === "") {
        console.log({ status: false, index: i, component: "Name" });
        return { status: false, index: i, component: "Name" };
      } else if (Eventcpy.Date === "") {
        console.log({ status: false, index: i, component: "Date" });
        return { status: false, index: i, component: "Date" };
      } else if (Eventcpy.Time === "") {
        console.log({ status: false, index: i, component: "Time" });
        return { status: false, index: i, component: "Time" };
      } else if (Eventcpy.Description === "") {
        console.log({ status: false, index: i, component: "Description" });
        return { status: false, index: i, component: "Description" };
      } else if (Eventcpy.VenueType === "") {
        console.log({ status: false, index: i, component: "VenueType" });
        return { status: false, index: i, component: "VenueType" };
      } else if (
        Eventcpy.VenueType === "Both" &&
        (Eventcpy.Location === "" || Eventcpy.Link === "")
      ) {
        console.log({
          status: false,
          index: i,
          component: "Both Location Link",
        });
        return { status: false, index: i, component: "Location" };
      } else if (Eventcpy.VenueType === "Online" && Eventcpy.Link === "") {
        console.log({ status: false, index: i, component: "Link" });
        return { status: false, index: i, component: "Location" };
      } else if (Eventcpy.VenueType === "Offline" && Eventcpy.Location === "") {
        console.log({ status: false, index: i, component: "Link" });
        return { status: false, index: i, component: "Location" };
      } else if (Eventcpy.file === "") {
        console.log({ status: false, index: i, component: "file" });
        return { status: false, index: i, component: "file" };
      } else if (Eventcpy.filetype === "") {
        console.log({ status: false, index: i, component: "filetype" });
        return { status: false, index: i, component: "filetype" };
      }
    }

    console.log({ status: true, index: null, component: "" });
    return { status: true, index: null, component: "" };
  };

  const addfinalDetails = () => {
    let EventsCopy = [...Events];
    EventsCopy.map((eve, index) => {
      if (index === 0) {
        eve.MainCode = "ME" + 313213132313;
        eve.eventCode = "ME" + 313213132313;
        eve.Link = "dsd/as3213";
        //mainevent will give acces to all
      } else {
        eve.MainCode = "ME" + 313213132313;
        eve.eventCode = "E" + "randomcode";
        eve.Link = "dsd/as3213/sdse";
        //single event access link
      }
    });
    setEvents(EventsCopy);
  };

  useEffect(async () => {
    addAnEvent();
  }, []);

  function StepRender(step) {
    switch (step.activeStep) {
      case 0:
        return (
          <CreateEvent
            setType={setType}
            Type={Type}
            Events={Events}
            setEvents={setEvents}
            addAnEvent={addAnEvent}
            checkIfEventEmpty={checkIfEventEmpty}
            handleChange={handleChange}
            removeAnEvent={removeAnEvent}
            SelectEvent={SelectEvent}
            SelectedEvent={SelectedEvent}
            handleNext={handleNext}
            handleBack={handleBack}
            addfinalDetails={addfinalDetails}
            albumdata={albumdata}
            setalbumdata={setalbumdata}
            Story={Story}
            setStory={setStory}
            template={events}
            className="p-15px"
          />
        );
      case 1000:
        return <Plan handleNext={handleNext} handleBack={handleBack} />;
      case 1:
        return (
          <AddParticipants
            handleNext={handleNext}
            handleBack={handleBack}
            Events={Events}
            setEvents={setEvents}
            SelectEvent={SelectEvent}
            SelectedEvent={SelectedEvent}
            addAnEvent={addAnEvent}
            removeAnEvent={removeAnEvent}
            addfinalDetails={addfinalDetails}
            Type={Type}
            Story={Story}
          />
        );
      case 3:
        return <div></div>;
      default:
        return <div></div>;
    }
  }

  return (
    <>
      <Header url={props.location.pathname} ismobile="desktop-only" />
      <Toggler toggle={console.log("toggle")} locaiton={"eve"} />
      <BackNavBar
        logo={<img src={Back} />}
        Name={"Create Event"}
        functionality={() => {
          history.push("/MyEvents");
        }}
      />
      <Grid container spacing={0} className=" pt-0">
        <Grid item xs={false} sm={2} md={2} />

        <Grid item xs={12} sm={8} md={8} className=" pt-0">
          <HorizontalLinearStepper
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
          />
          <StepRender activeStep={activeStep} />
        </Grid>

        <Grid item xs={false} sm={2} md={2} />
      </Grid>
    </>
  );
}

