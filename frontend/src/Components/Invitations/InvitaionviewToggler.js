import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InvitaionRSVP from "./InvitaionRSVP/InvitaionRSVP";
import InvitaionMain from "./InvitationMain/InvitaionMain";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
import CircularProgress from '@material-ui/core/CircularProgress';
export default function InvitaionviewToggler(props) {
  const dispatch = useDispatch();

  const [Eventdata, setEventdata] = useState(true)
  const [base, setbase] = useState("")

  const [dataloading, setdataloading] = useState(true)
  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents
  );
  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations
  );
  useEffect(async () => {
    debugger
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());

    } else {

      if (
        props.location.pathname ===
        "/MyEvents/eventpage/" + props.match.params.id && MyEvents.length > 0
      ) {
        await setEventdata(MyEvents[props.match.params.id]);
        await setbase("MyEvents");
      } else if (
        props.location.pathname ===
        "/inv/eventpage/" + props.match.params.id && myInvitations.length > 0
      ) {
        await setEventdata(myInvitations[props.match.params.id]);
        await setbase("inv");
      }
      setdataloading(false)
    }
  }, [MyEvents, myInvitations])


  const [evno, setevno] = useState(0);
  const Auth = useSelector((state) => state.Auth);
  const [hasallrsvps, sethasallrsvps] = useState(false);
  const [rsvpnumber, setrsvpnumber] = useState(0);
  useEffect(() => {
    if (Eventdata && evno < Eventdata.length) {
      let EVcount = 0;
      for (let i = 0; i < Eventdata.length; i++) {
        if (Eventdata[i].RSVPList.length > 0) {
          let RSVPList = Eventdata[i].RSVPList;

          for (let j = 0; j < RSVPList.length; j++) {
            if (RSVPList[j].By === Auth.Phone) {
              EVcount++;
            } else {
              setrsvpnumber(i);
            }
          }
        }
      }
      if (EVcount === Eventdata.length) {
        sethasallrsvps(true);
      } else {
      }
    }
    console.log(Eventdata);
    console.log(props);
  }, [Eventdata]);
  return (
    <>{dataloading === false ? <div>
      {hasallrsvps === false ? (
        <InvitaionRSVP
          Eventdata={Eventdata}
          setevno={setevno}
          id={props.match.params.id}
          sethasallrsvps={sethasallrsvps}
          toggle={true}
          base={base}
        />
      ) : (
        <InvitaionMain
          Eventdata={Eventdata}
          id={props.match.params.id}
          base={base}
        />
      )}
    </div> : <CircularProgress style={{ width: '6vw', position: 'fixed', top: '45vh', left: '47vw' }} />}
    </>
  );
}
