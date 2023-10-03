import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import generateAccessToken from "../config/accessToken";
import generateRefreshToken from "../config/refreshToken";

// register user
const registerUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullname, username, email, password, faceBookId, avatar } = req.body;
    const newUserName = username.toLowerCase().replace(/ /g, "");

    // check if the username exsits or not
    const user_name = await User.findOne({ username: newUserName });
    if (user_name) {
      return res.status(400).json({ error: "This user name already exists." });
    }

    // check if the email exists or not
    const user_email = await User.findOne({ email });
    if (user_email) {
      return res.status(400).json({ error: "This email already exists." });
    }

    // check if the password meet the requiement
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    //create a user to database
    const newUser = await new User({ fullname, username, email, password, faceBookId, avatar }).save();

    //create access token and refresh token
    const accessToken = await generateAccessToken(newUser?._id);
    const refreshToken = await generateRefreshToken(newUser?._id);

    //update the access token to the database
    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        token: accessToken,
      },
      { new: true }
    );

    // save refresh token into cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 720 * 60 * 60 * 1000, //30 days
    });

    res.status(200).json(updateUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// login
const logIn = asyncHandler(async (req: IReqAuth, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ error: "This user does not exist." });
    }

    // check password match if user exist
    if (findUser && (await findUser.isPasswordMatched(password))) {
      // generate access token and refresh token and update them
      const accessToken = await generateAccessToken(findUser?._id);
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateUser = await User.findByIdAndUpdate(
        findUser._id,
        {
          token: accessToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        path: "/api/auth/refresh",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 720 * 60 * 60 * 1000,
      });
      res.status(200).json(updateUser);
    } else {
      res.status(400).json({ error: "Password is incorrect." });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// logout
const logOut = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// get currentuser info
const getCurrentUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const getUser = await User.findOne({ _id: req.user!._id });
    res.json(getUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// update user info
const updateUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// forgot password token
const forgotPasswordToken = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// reset password
const resetPassword = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export {
  registerUser,
  getCurrentUser,
  logIn,
  logOut,
  updateUser,
  handleRefreshToken,
  forgotPasswordToken,
  resetPassword,
};
