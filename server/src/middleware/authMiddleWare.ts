import { Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IReqAuth, IDecodedToken } from "../config/interface";

const authMiddleware = asyncHandler(async (req: IReqAuth, res: Response, next: NextFunction): Promise<any | void> => {
  try {
    // get headers authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Not authorized, No token" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = <IDecodedToken>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    const user = await User.findById(decoded?.id);
    if (!user) {
      return res.status(401).json({ msg: "Not authorized, User not found" });
    }
    req.user = user;
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
});

export { authMiddleware };
