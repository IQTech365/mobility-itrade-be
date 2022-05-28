import axios from "axios";
import { url } from "../../Utils/Config";
import { ADDCODEDEVENT, DELETECODEDEVENT } from "../Actions/CodeAction";
import history from "../../Utils/History";
export function addEvent(Code, Name) {
    return (dispatch) => {
        dispatch({ type: ADDCODEDEVENT, payload: { Code: Code, Name: Name } });
    };
}
export function deleteEvent() {
    return (dispatch) => {
        dispatch({ type: DELETECODEDEVENT });
    };
}