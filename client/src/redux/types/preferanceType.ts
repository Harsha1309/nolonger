import { IPreferance } from "../../utils/TypeScript";

export const GET_PREFERANCE = "GET_PREFERANCE";

export interface IGetPreferanceType {
  type: typeof GET_PREFERANCE;
  payload: IPreferance;
}
