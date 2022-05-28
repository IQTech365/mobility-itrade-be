const initialState = {
  Name: "Event ",
  Participants: [],
  file: "",
  filetype: "",
  Date: "",
  Time: "",
  VenueType: "Online",
  Location: "",
  Link: "",
  Description: "",
  GuestInvite: false,
  Host: "",
  Co_Host: [],
  Schedule: [],
};

const CreateEventForm = (state = initialState, action) => {
  switch (action.type) {
    case "SAVEFORM":
      state = action.payload;
      return state;

    default:
      return state;
  }
};
export default CreateEventForm;
