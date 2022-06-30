import { IBlog } from "../../utils/TypeScript";

export const GET_DRAFTS_USER_ID = "GET_DRAFTS_USER_ID";
export const CREATE_DRAFTS_USER_ID = "CREATE_DRAFTS_USER_ID";
export const DELETE_DRAFTS_USER_ID = "DELETE_BDRAFTS_USER_ID";

export interface IDraftsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetDraftsUserType {
  type: typeof GET_DRAFTS_USER_ID;
  payload: IDraftsUser;
}

export interface ICreateDraftsUserType {
  type: typeof CREATE_DRAFTS_USER_ID;
  payload: IBlog;
}

export interface IDeleteDraftsUserType {
  type: typeof DELETE_DRAFTS_USER_ID;
  payload: IBlog;
}

export type IDraftUserType =
  | IGetDraftsUserType
  | ICreateDraftsUserType
  | IDeleteDraftsUserType;
