import React, { useState, useEffect } from "react";
import "./AddDetails.css";
import { Grid } from "@material-ui/core";
import Header from "../../Helpers/Header/Header";
import Toggler from "../../Helpers/EventInvitoggler/Toggler";
import Back from "../../../Assets/Back.svg";
import BackNavBar from "../../Helpers/BackNavbar/BackNavBar";
import AddSchedule from "../Extras/Schedule";
import Album from "../Extras/Album";
import Story from "../Extras/Story";
import history from "../../../Utils/History";
export default function AddDetails(props) {
  const [Name, SetName] = useState(props.Name);

  return (
    <>
      <Header />
      <Toggler toggle={console.log("toggle")} locaiton={"eve"} />

      <BackNavBar
        logo={<img src={Back} />}
        Name={"Add " + Name}
        functionality={() => {
          props.open(false);
        }}
        icon={
          <button
            className="Skip-button"
            onClick={() => {
              props.open(false);
            }}
          >
            Skip
          </button>
        }
      />
      <Grid container spacing={0} style={{ marginTop: 10 }}>
        <Grid item xs={12} className="tab-header"></Grid>
        <Grid item xs={false} sm={2} md={2} />

        <Grid item xs={12} sm={8} md={8} className="p-15px pt-0">
          <Grid container spacing={0} className="DetailHeader">
            <Grid
              item
              xs={4}
              md={2}
              onClick={() => {
                SetName("Schedule");
              }}
              className={
                Name === "Schedule" ? "l-blue-t tac u theme-font" : "tac"
              }
            >
              Schedule
            </Grid>
            <Grid
              item
              xs={4}
              md={2}
              onClick={() => {
                SetName("Story");
              }}
              className={
                props.SelectedEvent === 0
                  ? Name === "Story"
                    ? "tac show l-blue-t u theme-font"
                    : "tac show theme-font"
                  : "tac hide"
              }
            >
              Our Story
            </Grid>
            <Grid
              item
              xs={4}
              md={2}
              onClick={() => {
                SetName("Album");
              }}
              className={
                props.SelectedEvent === 0
                  ? Name === "Album"
                    ? "tac show l-blue-t u theme-font"
                    : "tac show theme-font"
                  : "tac hide"
              }
            >
              Album
            </Grid>
          </Grid>
          {Name === "Schedule" ? (
            <AddSchedule
              data={props.data}
              setEvents={props.setEvents}
              SelectEvent={props.SelectEvent}
              SelectedEvent={props.SelectedEvent}
              CurrentEventDetails={props.CurrentEventDetails}
              Events={props.Events}
              SelectedEvent={props.SelectedEvent}
              SetCurrentEventDetails={props.SetCurrentEventDetails}
              SetScheduleVisible={props.SetScheduleVisible}
              SetName={SetName}
            />
          ) : (
            <>
              {Name === "Story" ? (
                <Story
                  data={props.data}
                  setEvents={props.setEvents}
                  SelectEvent={props.SelectEvent}
                  SelectedEvent={props.SelectedEvent}
                  CurrentEventDetails={props.CurrentEventDetails}
                  Events={props.Events}
                  SelectedEvent={props.SelectedEvent}
                  SetCurrentEventDetails={props.SetCurrentEventDetails}
                  SetScheduleVisible={props.SetScheduleVisible}
                  SetName={SetName}
                />
              ) : (
                <></>
              )}
              {Name === "Album" ? (
                <Album
                  data={props.data}
                  setEvents={props.setEvents}
                  SelectEvent={props.SelectEvent}
                  SelectedEvent={props.SelectedEvent}
                  CurrentEventDetails={props.CurrentEventDetails}
                  Events={props.Events}
                  SelectedEvent={props.SelectedEvent}
                  SetCurrentEventDetails={props.SetCurrentEventDetails}
                  open={props.open}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={false} sm={2} md={2} />
      </Grid>
    </>
  );
}
