import { INotification } from "../../utils/TypeScript";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

export interface INotificationState {
  data: INotification[];
  new: boolean;
  total: number;
}

export interface IGetNotificationType {
  type: typeof GET_NOTIFICATIONS;
  payload: { data: INotification[]; new: boolean; total: number };
}

export type INotificationType = IGetNotificationType;
