import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import homeBlogs from "./homeBlogsReducer";
import blogsCategory from "./blogsCategoryReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";
import comments from "./commentReducer";
import notification from "./notificationReducer";
import socket from "./socketReducer";
import draftsUser from "./draftReducer";
import darkModeReducer from "./darkModeReducer";

//import follow from './followReducer'
export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
  comments,
  socket,
  notification,
  draftsUser,
  darkMode: darkModeReducer,
  // follow
});
