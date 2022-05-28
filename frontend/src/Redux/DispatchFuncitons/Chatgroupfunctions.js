import axios from "axios";
import { url } from "../../Utils/Config";
import jwt_decode from "jwt-decode";
import history from "../../Utils/History";
import { SAVECHATS, GOTCHATS, UPDATECHAT } from "../Actions/ChatActions";
export function savechats(DATA) {
  return (dispatch) => {
    dispatch({ type: SAVECHATS, payload: DATA });
  };
}
export function creategroup(Name, room, Participants, GrpPhoto, Type) {
  return (dispatch) => {
    axios
      .post(url + "chatgroup/createroom", {
        Name: Name,
        room: room,
        Participants: Participants,
        GrpPhoto: GrpPhoto,
        Type: Type,
      })
      .then((res) => {
        dispatch(getChats());
      });
  };
}
export function updatechat(data, room) {
  return (dispatch) => {
    dispatch({
      type: UPDATECHAT,
      payload: {
        data,
        room,
      },
    });
  };
}
export function getChats() {
  return (dispatch) => {
    axios.get(url + "chatgroup/getmyrooms").then((res) => {
      dispatch({ type: SAVECHATS, payload: res.data.Chatgroup });
      console.log(res);
      return true
    });
  };
}
