import { LogInstance } from "twilio/lib/rest/serverless/v1/service/environment/log";

export const checklogandfollow = (isloggedin, funcitontofollow, Loginfirst) => {
  if (isloggedin === true) {
    funcitontofollo();
  } else {
    Loginfirst();
  }
};
