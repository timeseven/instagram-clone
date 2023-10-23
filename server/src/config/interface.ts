import { Document } from "mongoose";
import { Request } from "express";

// User interface
export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  gender: string;
  mobile: string;
  address: string;
  story: string;
  website: string;
  faceBookId: string;
  followers: Array<IUser>;
  following: Array<IUser>;
  saved: Array<IUser>;
  token: string;
  isPasswordMatched: (enteredPassword: string) => Promise<boolean>;
}

//Post interface
export interface IPost extends Document {
  content: string;
  images: Array<string>;
  likes: Array<IUser>;
  comments: Array<IComment>;
  user: string;
}

// Comment interface
export interface IComment extends Document {
  content: string;
  tag: IUser;
  reply: string;
  likes: Array<IUser>;
  user: IUser;
  postId: IPost;
}

export interface IReqAuth extends Request {
  user?: IUser;
}

// jwt verify
export interface IDecodedToken {
  id?: string;
  user?: IUser;
  iat: number;
  exp: number;
}

export interface ISendEmail {
  to: string;
  subject: string;
  html: string;
}

export interface INotification extends Document {
  id: Object;
  user: IUser;
  recipients: Array<IUser>;
  images: string;
  url: string;

  content: string;
  isRead: boolean;
}
