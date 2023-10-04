import { Request, Response } from "express";
import { IReqAuth, IDecodedToken } from "../config/interface";
import asyncHandler from "express-async-handler";

import User from "../models/userModel";
import generateAccessToken from "../config/accessToken";
import generateRefreshToken from "../config/refreshToken";

import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

// register user
const registerUser = asyncHandler(async (req: Request, res: Response): Promise<any | void> => {
  try {
    const { fullname, username, email, password, faceBookId, avatar } = req.body;
    const newUserName = username.toLowerCase().replace(/ /g, "");

    // check if the username exsits or not
    const user_name = await User.findOne({ username: newUserName });
    if (user_name) {
      return res.status(400).json({ msg: "This user name already exists." });
    }

    // check if the email exists or not
    const user_email = await User.findOne({ email });
    if (user_email) {
      return res.status(400).json({ msg: "This email already exists." });
    }

    // check if the password meet the requiement
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters." });
    }

    //create a user to database
    const newUser = await new User({ fullname, username, email, password, faceBookId, avatar }).save();

    //create access token and refresh token
    const accessToken = await generateAccessToken(newUser?.id);
    const refreshToken = await generateRefreshToken(newUser?.id);

    //update the access token to the database
    const updateUser = await User.findByIdAndUpdate(
      newUser.id,
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
    res.status(400).json({ msg: error.message });
  }
});

// login
const logIn = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const { email, password } = req.body;

    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: "This user does not exist." });
    }

    // check password match if user exist
    if (findUser && (await findUser.isPasswordMatched(password))) {
      // generate access token and refresh token and update them
      const accessToken = await generateAccessToken(findUser?.id);
      const refreshToken = await generateRefreshToken(findUser?.id);
      const updateUser = await User.findByIdAndUpdate(
        findUser.id,
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
      res.status(400).json({ msg: "Password is incorrect." });
    }
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// logout
const logOut = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    res.clearCookie("refreshToken", {
      path: "/api/auth/refresh",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ msg: "Logged Out Successfully!" });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get currentuser info
const getCurrentUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const getCurrentUser = await User.findOne({ _id: req.user?.id });
    res.status(200).json(getCurrentUser);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// update user info
const updateUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const { username, avatar, fullname, mobile, address, story, website, gender } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        username,
        avatar,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // check if refreshToken exists in cookie or expires
    const rfToken = req.cookies.refreshToken;
    if (!rfToken) {
      return res.status(400).json({ msg: "Please login now!" });
    }
    const decoded = <IDecodedToken>jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET as string);
    if (!decoded.id) {
      return res.status(400).json({ msg: "Please login now!" });
    }

    // check user
    const user = await User.findById(decoded?.id);
    if (!user) {
      return res.status(400).json({ msg: "This user does not exist." });
    }

    const access_token = generateAccessToken(user?._id);
    await User.findOneAndUpdate(
      { _id: user?._id },
      {
        token: access_token,
      }
    );
    res.status(200).json(access_token);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// forgot password token
const forgotPasswordToken = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found with this email" });
    }

    const resetUrl = `Hi ${user?.username},<br>
    Sorry to hear you are having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now. <a href="https://localhost:4000/reset-password/${
      user!.token
    }">Log in as ${user?.username}</a>`;

    const data = {
      to: email,
      subject: `${user?.username}, you can get back to Instagram easily`,
      html: resetUrl,
    };

    sendEmail(data);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// reset password
const resetPassword = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    console.log(req.body);
    const { password, token } = req.body;
    const user = await User.findOne({
      refreshToken: token,
    });

    if (!user) {
      return res.status(400).json({ msg: "Token Expired, please try again later" });
    }
    user!.password = password;

    await user.save();

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
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
