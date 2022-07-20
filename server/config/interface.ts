import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  referer: string;
  blogcount: number;
  name: string;
  account: string;
  password: string;
  avatar: string;
  follower: string[];
  following: string[];
  role: string;
  type: string;
  notice?: boolean;
  rf_token?: string;
  _doc: object;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface INotice extends Document {
  user: string;
  msg: string;
  desc: string;
  url?: string;
  _doc: object;
}

export interface INotification {
  user: string;
  msg: [
    {
      msg: string;
      desc: string;
      time: Date;
      url?: string;
    }
  ];
  new: boolean;
}

export interface IBalance {
  user: string;
  balance: number;
  blogbalance: number;
  referalbalance: number;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IGgPayload {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
  referer?: string;
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IComment extends Document {
  user: string;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM: string[];
  reply_user: string;
  comment_root: string;
  _doc: object;
}

export interface IBlog extends Document {
  user: string;
  title: string;
  earn?: number;
  content: string;
  description: string;
  thumbnail: string;
  category: string;
  views: number;
  _doc: object;
}

export interface IDraft extends Document {
  user: string;
  title?: string;
  content?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  _doc: object;
}
