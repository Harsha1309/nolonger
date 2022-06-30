import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
  referer?: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  following: string[];
  follower: string[];
  type: string;
  about: string;
  paytm: string;
  updatedAt: string;
  _id: string;
}

export interface IUserProfile extends IUserRegister {
  avatar: any;
  about: string;
  paytm: string;
}

export interface IUserFollow {
  _id: string;
  following: string[];
  follower: string[];
}
export interface IBalance {
  _id: string;
  balance: number;
  referalbalance: number;
  blogbalance: number;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface INotification {
  msg: string;
  desc: string;
  time: Date;
  url?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  _id?: string;
  earn?: number;
  user: IUser | string;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  views?: number;
  createdAt: string;
}

export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}

