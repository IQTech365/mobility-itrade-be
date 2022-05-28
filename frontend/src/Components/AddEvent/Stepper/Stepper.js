import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["", "", ""];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "";
    case 1:
      return "";
    case 2:
      return "";
    default:
      return "";
  }
}

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();

  const steps = getSteps();

  return (
    // <div className={classes.root}>
    //   <Stepper activeStep={props.activeStep}>
    //     {steps.map((label, index) => {
    //       const stepProps = {};
    //       const labelProps = {};

    //       return (
    //         // <Step key={index} {...stepProps} c>
    //         //   <StepLabel {...labelProps} className="l-blue-t">
    //         //     {label}
    //         //   </StepLabel>
    //         // </Step>
    //
    //       );
    //     })}
    //   </Stepper>
    //   <div>
    //     <div>
    //       <Typography className={classes.instructions}>
    //         {getStepContent(props.activeStep)}
    //       </Typography>
    //     </div>
    //   </div>
    // </div>
    <div className="w-100 p-10px"></div>
  );
}
