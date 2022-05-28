import React from "react";
import "./Toggler.css";
import { Grid } from "@material-ui/core";
import history from "../../../Utils/History";
export default function Toggler(props) {
  const toggeleve = () => {
    history.push("/MyEvents");
  };
  const toggelinv = () => {
    history.push("/inv");
  };
  return (
    <Grid container spacing="0" className="toggler">
      <Grid item md={1}></Grid>
      <Grid item md={5}>
        <Grid container spacing="0">
          <Grid
            item
            md={3}
            onClick={() => {
              toggelinv();
            }}
            className={props.locaiton === "inv" ? "active" : ""}
          >
            My Invitaions
          </Grid>
          <Grid
            item
            md={3}
            className={props.locaiton === "eve" ? "active" : ""}
            onClick={() => {
              toggeleve();
            }}
          >
            My Events
          </Grid>
          <Grid item md={3}>
            More
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  );
}
