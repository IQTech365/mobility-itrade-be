const initialState = {
  groups: [],
  chats: [],
};

const Chatdata = (state = initialState, action) => {
  switch (action.type) {
    case "GOTCHATS":
      return {
        ...state,
        chats: action.payload,
      };
    case "SAVECHAT":
      return {
        ...state,
        groups: action.payload,
      };
    case "UPDATECHAT":
      let groupscpy = [...state.groups];
      groupscpy.map((grp) => {
        if (grp.room === action.payload.room) {
          grp.chats.push(action.payload.data);
        }
      });
      return {
        ...state,
        groups: groupscpy,
      };
    default:
      return state;
  }
};
export default Chatdata;
