import { SAVEFORM } from "../Actions/EventCreationFormActions";
export function editform(data) {
  return (dispatch) => {
    console.log("SAVEFORM");
    console.log(data);
    dispatch({ action: "SAVEFORM", payload: data });
  };
}
