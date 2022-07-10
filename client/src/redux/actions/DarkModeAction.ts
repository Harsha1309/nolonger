import { DARK_MODE } from "../types/Mode";

export const handledarkMode = (e) => async (dispatch) => {
  // getting the true or false value from the parameter and saving that to localstorage
  localStorage.setItem("darkmode", e);

  //dispatch data to reducer to be accessed as payload.action
  dispatch({
    type: DARK_MODE,
    payload: e,
  });
};