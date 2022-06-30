import { IUser } from "../../utils/TypeScript";

import {
  IDraftsUser,
  GET_DRAFTS_USER_ID,
  CREATE_DRAFTS_USER_ID,
  DELETE_DRAFTS_USER_ID,
  IDraftUserType,
} from "../types/draftType";

const draftsUserReducer = (
  state: IDraftsUser[] = [],
  action: IDraftUserType
): IDraftsUser[] => {
  switch (action.type) {
    case GET_DRAFTS_USER_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }

    case CREATE_DRAFTS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id
          ? {
              ...item,
              blogs: [action.payload, ...item.blogs],
            }
          : item
      );

    case DELETE_DRAFTS_USER_ID:
      return state.map((item) =>
        item.id === (action.payload.user as IUser)._id ||
        item.id === action.payload.user
          ? {
              ...item,
              blogs: item.blogs.filter(
                (blog) => blog._id !== action.payload._id
              ),
            }
          : item
      );
    default:
      return state;
  }
};

export default draftsUserReducer;
