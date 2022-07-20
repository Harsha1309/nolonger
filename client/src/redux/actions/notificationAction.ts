import { Dispatch } from "react";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuth, IAuthType } from "../types/authType";
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
            data: res.data.notice,
            total: 20,
          },
        });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const notificationRead =
  (auth: IAuth) =>
  async (dispatch: Dispatch<IAuthType | INotificationType | IAlertType>) => {
    if (!auth.access_token || !auth.user) return;

    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;

    try {
      const res = await patchAPI("notification", {}, access_token);
      dispatch({
        type: AUTH,
        payload: { ...auth, user: { ...auth.user, notice: false } },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
