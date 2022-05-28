import { GOTNOTIFICATIONS } from "../Actions/NotificationAction";
import axios from "axios";
import { url } from "../../Utils/Config";
export function getNotification() {
  return (dispatch) => {
    axios.get(url + "notification/getNotifications").then((res) => {
      dispatch({
        type: GOTNOTIFICATIONS,
        payload: res.data.data,
      });
      return true
      console.log(res);
    });
  };
}
