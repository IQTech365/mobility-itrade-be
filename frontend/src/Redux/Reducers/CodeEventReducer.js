const initialState = {
    Name: "",
    Code: ""
};

const CodeEvent = (state = initialState, action) => {
    switch (action.type) {
        case "ADDCODEDEVENT":
            return action.payload
            break;
        case "DELETECODEDEVENT":
            return initialState;
            break;
        default:
            return state;
    }
};
export default CodeEvent;
