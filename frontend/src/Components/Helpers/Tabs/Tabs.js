import React, { useState } from "react";
import "./Tabs.css";
import { Grid } from "@material-ui/core";
export default function Tabs() {
  return (
    <Grid spacing={0} container>
      <Grid xs={4} className={props.current === 0 ? "active-tab" : "tab"}>
        {props.Taboption[0]}
      </Grid>
      <Grid xs={4} className={props.current === 1 ? "active-tab" : "tab"}>
        {props.Taboption[1]}
      </Grid>
      <Grid xs={4} className={props.current === 1 ? "active-tab" : "tab"}>
        {props.Taboption[2]}
      </Grid>
    </Grid>
  );
}
