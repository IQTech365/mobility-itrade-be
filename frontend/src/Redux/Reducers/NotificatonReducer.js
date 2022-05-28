const initialState = [];

const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case "GOTNOTIFICATIONS":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default Notifications;
