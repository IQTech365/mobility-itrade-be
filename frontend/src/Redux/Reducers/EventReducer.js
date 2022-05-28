import { reactLocalStorage } from "reactjs-localstorage";

const initialState = {
  ALBUM: [],
  STORY: [],
  myEvents: [],
  myInvitations: [],
};

const Eventdata = (state = initialState, action) => {
  switch (action.type) {
    case "SAVEALBUM":
      return {
        ...state,
        ALBUM: action.payload,
      };
    case "DELETEALBUM":
      return {
        ...state,
        ALBUM: [],
      };
    case "SAVESTORY":
      return {
        ...state,
        STORY: action.payload,
      };
    case "DELETESTORY":
      return {
        ...state,
        STORY: [],
      };
    case "GOTMYEVENTS":
      let datacopy = [];
      let tracker = [];
      let mcindex = 0;
      //get similar events in single array
      console.log(action.payload);
      let payload = [];
      if (action.payload !== undefined) {
        payload = [...action.payload];
      } else {
        payload = [];
      }
      for (let i = 0; i < payload.length; i++) {
        if (tracker.length === 0) {
          datacopy[0] = [action.payload[i]];
          tracker.push(action.payload[i].MainCode);
        } else {
          mcindex = tracker.includes(action.payload[i].MainCode);
          if (mcindex === true) {
            let key = tracker.findIndex(
              (track) => track === action.payload[i].MainCode
            );
            console.log(key);
            datacopy[key] = [...datacopy[key], action.payload[i]];
          } else {
            tracker.push(action.payload[i].MainCode);
            datacopy.push([action.payload[i]]);
          }
        }
      }

      return {
        ...state,
        myEvents: datacopy,
      };
    case "GETMYINVITAITONS": {
      let datacopy = [];
      let tracker = [];
      let mcindex = 0;
      //get similar events in single array
      console.log(action.payload);
      let payload = [];
      if (action.payload !== undefined) {
        payload = [...action.payload];
      } else {
        payload = [];
      }

      for (let i = 0; i < payload.length; i++) {
        if (tracker.length === 0) {
          datacopy[0] = [action.payload[i]];
          tracker.push(action.payload[i].MainCode);
        } else {
          mcindex = tracker.includes(action.payload[i].MainCode);
          if (mcindex === true) {
            let key = tracker.findIndex(
              (track) => track === action.payload[i].MainCode
            );
            console.log(key);
            datacopy[key] = [...datacopy[key], action.payload[i]];
          } else {
            tracker.push(action.payload[i].MainCode);
            datacopy.push([action.payload[i]]);
          }
        }
      }

      return {
        ...state,
        myInvitations: datacopy,
      };
    }
    default:
      return state;
  }
};
export default Eventdata;
