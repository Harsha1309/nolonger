import { Dispatch } from "react";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { IAuth } from "../types/authType";
import {
  GET_NOTIFICATIONS,
  INotificationType,
} from "../types/notificationType";

export const getNotifications =
  (auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | INotificationType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    try {
      const res = await getAPI("notification", access_token);
      if (res)
        dispatch({
          type: GET_NOTIFICATIONS,
          payload: {
            data: res.data.msg,
            new: res.data.new,
            total: res.data.msg.length,
          },
        });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const notificationRead =
  (auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | INotificationType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    try {
      const res = await patchAPI("notification", {}, access_token);
      if (res)
        dispatch({
          type: GET_NOTIFICATIONS,
          payload: {
            data: res.data.msg,
            new: res.data.new,
            total: res.data.msg.length,
          },
        });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
