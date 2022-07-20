import { INotification } from "../../utils/TypeScript";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";

export interface INotificationState {
  data: INotification[];
  total: number;
}

export interface IGetNotificationType {
  type: typeof GET_NOTIFICATIONS;
  payload: { data: INotification[]; total: number };
}

export type INotificationType = IGetNotificationType;
