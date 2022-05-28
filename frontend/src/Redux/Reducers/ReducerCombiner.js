import Auth from "./AuthReducer";
import { combineReducers } from "redux";
import Eventdata from "./EventReducer";
import CreateEventForm from "./CreateEventFormReducer";
import Chatdata from "./ChatReducer";
import Notifications from "./NotificatonReducer";
import Posts from "./PostReducer";
import CodeEvent from './CodeEventReducer'
const allreducers = combineReducers({
  Auth: Auth,
  Eventdata: Eventdata,
  CreateEventForm: CreateEventForm,
  Chatdata: Chatdata,
  Notifications: Notifications,
  Posts: Posts,
  CodeEvent: CodeEvent
});
export default allreducers;
