import React, { useState } from "react";
import "./Plan.css";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
function Plancard(props) {
  return (
    <Paper
      className="plancard"
      onClick={() => {
        props.selectplan(props.plani);
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} className={"upperplan " + props.plan}>
          <Grid xs={12} className="tac t-white pfsmall">
            {props.plan}
          </Grid>
          <Grid xs={12} className="tac t-white pflarge">
            {props.invites}
            <br />
            Invites
          </Grid>
          <Grid xs={12} className="tac t-white pfmed">
            {props.cost}
          </Grid>
        </Grid>
        <Grid item xs={12} className="lowerplan">
          <ul class="a">
            <li>Multiple Events</li>
            <li>Albums</li>
            <li>Schedule</li>
            <li>Ousr Story</li>
            <li>Location</li>
            <li>Multiple Admin</li>
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default function Plan(props) {
  const [selectedplan, selectplan] = useState(0);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div className="planheadbottom"></div>
        <div className="planheadtop"></div>
      </Grid>
      <Grid item xs={12} className="plancardholder">
        <Plancard
          plan={"Free"}
          selectplan={selectplan}
          cost={"RS 00 / Month"}
          invites={"50"}
          plani={0}
        />

        <Plancard
          plan={"Bronze"}
          selectplan={selectplan}
          cost={"RS 99 / Month"}
          invites={"200"}
          plani={1}
        />

        <Plancard
          plan={"Silver"}
          selectplan={selectplan}
          cost={"RS 299 / Month"}
          invites={"400"}
          plani={2}
        />

        <Plancard
          plan={"Gold"}
          selectplan={selectplan}
          cost={"RS 499 / Month"}
          invites={"400+"}
          plani={3}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Plan Amount
            </Grid>
            <Grid item xs={3}>
              {selectedplan === 0 ? "Rs 00" : <></>}
              {selectedplan === 1 ? "Rs 99" : <></>}
              {selectedplan === 2 ? "Rs 299" : <></>}
              {selectedplan === 3 ? "Rs 499" : <></>}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Extra Template
            </Grid>
            <Grid item xs={3}>
              Rs 00
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Coupon Discount
            </Grid>
            <Grid item xs={3}>
              Rs 00
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className="planpayment">
          <Grid container spacing={0}>
            <Grid item xs={9}>
              Total Amount
            </Grid>
            <Grid item xs={3}>
              <b>
                <u>
                  {selectedplan === 0 ? "Rs 00" : <></>}
                  {selectedplan === 1 ? "Rs 99" : <></>}
                  {selectedplan === 2 ? "Rs 299" : <></>}
                  {selectedplan === 3 ? "Rs 499" : <></>}
                </u>
              </b>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className="m-7px">
        <button
          className="custom-file-upload"
          onClick={() => props.handleNext()}
        >
          Make Payment
        </button>
      </Grid>
    </Grid>
  );
}
