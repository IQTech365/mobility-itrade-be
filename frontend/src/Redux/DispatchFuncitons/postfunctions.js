import { GOTPOST } from "../Actions/PostActions";
import axios from "axios";
import { url } from "../../Utils/Config";
import { GetEvents } from './Eventfunctions'
import { getNotification } from './NotificationFunctions'
export function getposts() {
  return (dispatch) => {

    axios.get(url + "post/getposts").then((res) => {
      dispatch({
        type: GOTPOST,
        payload: res.data.data,
      });
      return true
      console.log(res);
    });
  };
}
export function likepost(id, by, MainCode) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios.post(url + "post/like", { id: id, by: by, date: dateTime, MainCode: MainCode }).then((res) => {
      dispatch(getNotification());
      console.log(res);
    });
  };
}
export function likecomment(id, by, MainCode) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios.post(url + "event/likecomment", { id: id, by: by, date: dateTime, MainCode: MainCode }).then((res) => {
      dispatch(GetEvents());
      dispatch(getNotification());
      console.log(res);
    });
  };
}
export function addcomments(id, by, comment, MainCode) {
  return (dispatch) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    axios
      .post(url + "post/comment", { id: id, by: by, comment: comment, date: dateTime, MainCode: MainCode })
      .then((res) => {
        console.log(res);
        dispatch(GetEvents());
        dispatch(getNotification());
        return 1;

      });
  };
}

export function addpost(id, by, furl, type, tags, caption) {
  return (dispatch) => {
    console.log("alling");
    axios
      .post(url + "post/add", {
        id: id,
        by: by,
        furl: furl,
        type: type,
        tags: tags,
        caption: caption,
      })
      .then((res) => {
        // dispatch(getposts());
        dispatch(getNotification());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
