import React from "react";
import "./BackNav.css";
import { Grid } from "@material-ui/core";
export default function BackNavBar(props) {
  return (
    <Grid container spacing={0} className="Back-Nav">
      <Grid container spacing={0} className="p-0">
        <Grid item xs={false} sm={2} md={2} />

        <Grid item xs={12} sm={8} md={8} className="p-0">
          <Grid container spacing={0}>
            <Grid
              item
              xs={2}
              sm={1}
              md={1}
              className="tac"
              onClick={() => {
                props.functionality();
              }}
            >
              {props.logo}
            </Grid>
            <Grid item xs={8} sm={9} md={9} className="Big-title">
              {props.Name}
            </Grid>
            <Grid item xs={2} sm={2} md={2} className="tac">
              {props.icon}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={false} sm={2} md={2} />
      </Grid>
    </Grid>
  );
}
