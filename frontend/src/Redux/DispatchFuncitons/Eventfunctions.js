import axios from "axios";
import { url } from "../../Utils/Config";
import {
  EVENTSAVED,
  EVENTSAVEFAIL,
  GOTMYEVENTS,
  GETMYINVITAITONS, DELETEALBUM, DELETESTORY
} from "../Actions/EventActions";
import { deleteEvent } from './CodeFunctions';
import history from "../../Utils/History";
export function saveEvent(edata) {
  return (dispatch) => {
    console.log(edata);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    edata.date = dateTime;
    axios.post(url + "event/create", edata).then(async (res) => {
      console.log(res);
      await dispatch({
        type: DELETEALBUM
      })
      await dispatch({
        type: DELETESTORY
      })
      history.push("/MyEvents/event-create-success/" + res.data.MainCode);
    });
  };
}
export function addme(code, Name) {
  return (dispatch) => {
    console.log(code);
    axios
      .post(url + "event/addme", { code: code, Name: Name })
      .then(async (res) => {

        if (res.data.status === 'status') {
          await dispatch(deleteEvent());
          await dispatch(GetEvents());
          await dispatch(GetInvitations());
          alert("Event added");
        }

      })
      .catch((err) => {
        return 0;
      });
  };
}
export function GetEvents() {
  return (dispatch) => {
    axios.get(url + "event/getmyEvents").then((res) => {
      dispatch({
        type: GOTMYEVENTS,
        payload: res.data.MyEvents,
      });
      return true
    });
  };
}

export function GetInvitations() {
  return (dispatch) => {
    axios.get(url + "event/getmyInvitaion").then((res) => {
      dispatch({
        type: GETMYINVITAITONS,
        payload: res.data.Invitations,
      });
      console.log(res);
      return true
    });
  };
}
export function rsvp_event(id, status, Phone) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/rsvp", { id: id, status: status, Phone: Phone, date: dateTime })
      .then((res) => {
        // dispatch(GetInvitations());
        // dispatch(GetEvents());
        console.log(res);
        return 1
      });
  };
}
export function like_event(id) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios.post(url + "event/like", { id: id, dateTime: dateTime }).then((res) => {
      dispatch(GetInvitations());
      dispatch(GetEvents());
      console.log(res);
    });
  };
}
export function comment_event(id, comment) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/comment", { id: id, comment: comment, date: dateTime })
      .then(async (res) => {

        await dispatch(GetInvitations());
        await dispatch(GetEvents());

        return 1;
      });
  };
}
export function change_event(id, type, data) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/updateevents", { id: id, type: type, data: data, date: dateTime })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function add_participants(id, data) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/add_participants", { id: id, data: data, date: dateTime })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function update_participants(id, data) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "event/UpdateParticipants", { id: id, data: data, date: dateTime })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function update_events(Type, Eventdata, maincode) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/updateevents", {
        Type: Type,
        Eventdata: Eventdata,
        maincode: maincode,
        date: dateTime
      })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}
export function uploadfiletoalbum(Album, MainCode) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return (dispatch) => {
    axios
      .post(url + "event/addalbum", {
        Album: Album, _id: MainCode, date: dateTime
      })
      .then((res) => {
        dispatch(GetInvitations());
        dispatch(GetEvents());
        console.log(res);
      });
  };
}