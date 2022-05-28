import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./Invitations.css"
import Header from "../Helpers/Header/Header";
import BlankSchedule from "../../Assets/BlankSchedule.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import history from "../../Utils/History";
import { useSelector, useDispatch } from "react-redux";
import { GetEvents, GetInvitations } from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function ShowSchedule(props) {
  const dispatch = useDispatch();
  const [Eventdata, setEventdata] = useState([])
  const [base, setbase] = useState("")

  let MyEvents = useSelector(
    (state) => state.Eventdata.myEvents
  );

  let myInvitations = useSelector(
    (state) => state.Eventdata.myInvitations
  );
  useEffect(async () => {
    if (MyEvents.length === 0 && myInvitations.length === 0) {
      await dispatch(GetEvents());
      await dispatch(GetInvitations());
    } else {
      if (
        props.location.pathname ===
        "/MyEvents/schedule/" +
        props.match.params.id +
        "/" +
        props.match.params.event
      ) {
        await setEventdata(MyEvents[props.match.params.id][props.match.params.event].Schedule);
        await setbase("MyEvents");
      } else {
        await setEventdata(myInvitations[props.match.params.id][props.match.params.event].Schedule);
        await setbase("inv");
      }
    }
  }, [])

  return (
    <>
      <div className="desktop-only w-100" >
        <Header className="desktop-only" />
      </div>

      <Grid container spacing={0}>
        <Grid item xs={false} md={2}></Grid>
        <Grid item xs={12} md={10}>
          <Row
            style={{
              marginTop: 20,
              marginRight: 3,
              marginLeft: 3,
              marginBottom: 10,
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: 23 }}>
              <IoArrowBackCircleOutline
                size={40}
                onClick={() => {
                  history.goBack();
                }}
              />
              Schedules
            </p>
          </Row>
        </Grid>

        <Grid item xs={12} style={{ padding: '18px' }}>
          {Eventdata.length > 0 ? (
            <>
              {Eventdata.map((eve, index) => (<>
                <Grid item xs={false} md={2} />
                <Grid item xs={12} md={8} className="card-shadow m-b-10 p-15px m-5px" style={{ borderRadius: '2px' }}>
                  <Grid container spacing={0}>
                    <>
                      <Grid
                        container
                        spacing={0}
                        className="padding-left-7 p-10-p "
                      >
                        <Grid item xs={12}>
                          <div className="ScheduleName l-black-t m-0">
                            {eve.Name}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          {eve.Venue}
                        </Grid>
                        <Grid item xs={12} className="dtime l-blue-t" style={{ fontWeight: 'bold' }}>
                          {eve.datetime.split("T")[0] +
                            " " +
                            eve.datetime.split("T")[1]}
                        </Grid>
                        <Grid item xs={12} className="mt-10px" style={{ fontSize: 13, color: 'grey', height: '32px', overflow: 'scroll', background: '#e2ffff' }}>
                          {eve.description}
                        </Grid>
                      </Grid>
                    </>
                  </Grid>
                </Grid>
                <Grid item xs={false} md={2} />
              </>
              ))}
            </>
          ) : (
            <img src={BlankSchedule} className="blank-img" />
          )}
        </Grid>
      </Grid>
    </>
  );
}
