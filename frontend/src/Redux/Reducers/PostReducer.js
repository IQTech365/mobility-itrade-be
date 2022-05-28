const initialState = [];

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case "GOTPOST":
      state = action.payload;
      console.log(state);
      return state;
    default:
      return state;
  }
};
export default Posts;
