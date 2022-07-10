import { DARK_MODE } from "../types/Mode";

// initial state
const initialState = {
  // checking mode from localstorage if falsey (e.g. 0, null, undefined, etc.) it will be false, otherwise true
  isdarkMode: !!JSON.parse(localStorage.getItem("darkmode")||'{}'),
};

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        // getting value from the action file and changing isdarkMode State.
        isdarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;