import { Document } from "mongoose";
import { Request } from "express";

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
}

export interface IReqAuth extends Request {
  user?: IUser;
}
