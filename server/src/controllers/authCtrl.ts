import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import { IReqAuth } from "../config/interface";

// register user
const regUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, username, email, password, faceBookId, avatar } = req.body;
    const newUser = await User.create({ fullname, username, email, password, faceBookId, avatar });
    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// get currentuser info
const getCurrentUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    console.log("req", req);
    const getUser = await User.findOne({ _id: req.user!._id });
    res.json(getUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { regUser, getCurrentUser };
