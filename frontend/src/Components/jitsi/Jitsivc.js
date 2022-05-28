import React from "react";
import Jitsi from "react-jitsi";
import { useSelector } from "react-redux";
import { Jutsu } from "react-jutsu";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
export default function Jitsivc(props) {
  const Auth = useSelector((state) => state.Auth);
  return (
    <>
      <Header />
      <Jutsu
        roomName={props.match.params.id}
        displayName={Auth.Name}
        onMeetingEnd={() => history.goBack()}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong</p>}
        // domain="live.mobillyinvite.com"
      />
    </>
  );
}
