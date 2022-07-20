import {
  INotificationState,
  GET_NOTIFICATIONS,
  IGetNotificationType,
  INotificationType,
} from "../types/notificationType";

const initialState = {
  data: [],
  total: 0,
};

const commentReducer = (
  state: INotificationState = initialState,
  action: INotificationType
): INotificationState => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.payload;

    default:
      return state;
  }
};

export default commentReducer;
