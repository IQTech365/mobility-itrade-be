import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { Avatar, IconButton } from "@material-ui/core";
import "./Notifications.css"
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NoNotfcations from '../../Assets/NoNotifications.svg'
export default function Notification(props) {
  const Notifications = useSelector((state) => state.Notifications);
  const Auth = useSelector((state) => state.Auth);

  useEffect(() => {
    console.log(props)
    Notifications.map(notes => {
      console.log(notes.MainCode)
    })
  }, [])

  return (
    <>
      <div className="Notificationportion-strt p-2 ">
        <div className="Notifications-header d-flex flex-row" style={{ marginTop: -15 }}>
          <h4
            className="font-weight-bold pr-5 pt-2"
            style={{ marginRight: "0%" }}
          >
            Notifications
          </h4>
        </div>
      </div>
      {Notifications.length > 0 ? (
        <div className="ofh " style={{ marginTop: "13px", boxShadow: '10px 10px 12px -7px rgb(0 0 0 / 25%)', height: '70vh' }}>
          {Notifications.map((note, index) =>
            note.by === Auth.Phone ? <></> : (props.MainCode && note.MainCode === props.MainCode ?
              <div className="media  mb-3">
                <Avatar className="mr-3" src={note.img} alt="img" style={{ top: '4px' }} />
                <div className="media-body">
                  <h5 className="mt-0 font-weight-bold small">
                    {note.Notification}
                  </h5>
                  <p className="text-secondary time_notification">{note.date.split('T')[0] + ' ' + ' ' + note.date.split('T')[1].substring(0, 5)}</p>
                </div>
              </div> : <></>)
          )}
        </div>) :
        <>
          <img src={NoNotfcations} className="w-100" />
          <br />
          <h4 className="tac">No Notification</h4>
        </>
      }


    </>
  );
}
