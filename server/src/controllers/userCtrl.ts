import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";

// search User
const searchUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username },
    })
      .limit(10)
      .select("fullname username avatar"); // return id, fullname, username and avatar

    res.json({ users });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get user
const getUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const data = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("followers following", "avatar username fullname followers following");

    if (!data) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get Suggestion User
const getSuggestionUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const currentUser = await User.findById(req.user?.id);
    const following = currentUser?.following;

    // Retrieve 5 users who are not followed by the current user
    const users = await User.find({
      _id: { $ne: currentUser?._id, $nin: following },
    })
      .limit(5)
      .select("-password -createdAt -updatedAt")
      .populate("followers following", "username,avatar");

    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// followUser
const followUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // check if the current user has followed this user
    const user = await User.find({
      _id: req.params.id,
      followers: req.user?._id,
    });
    if (user.length > 0) {
      return res.status(400).json({ msg: "You followed this user." });
    }

    // if not, follow this user by add the current user id to the followers of this user
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { followers: req.user?._id },
      },
      { new: true }
    );

    // meanwhile, adding this user id to the following of this current user
    const newUser = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $push: { following: req.params.id },
      },
      { new: true }
    )
      .select("-password")
      .populate("followers following", "avatar username fullname followers following");

    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// unfollowUser
const unfollowUser = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // check if the current user has followed this user
    const user = await User.find({
      _id: req.params.id,
      followers: req.user?._id,
    });
    if (user.length === 0) {
      return res.status(400).json({ msg: "You didn't follow this user." });
    }

    // if followed, unfollow this user by deleting the current user id from the followers of this user
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user?._id },
      },
      { new: true }
    );

    // meanwhile, deleting this user id from the following of this current user
    const newUser = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $pull: { following: req.params.id },
      },
      { new: true }
    )
      .select("-password")
      .populate("followers following", "avatar username fullname followers following");

    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// savepost
const savePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // check if the current user has saved this post
    const user = await User.find({
      _id: req.user?._id,
      saved: req.params.id,
    });

    if (user.length > 0) {
      return res.status(400).json({ msg: "You saved this post." });
    }

    // if not, save this post by adding the post id to the save of the current user
    const save = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $push: { saved: req.params.id },
      },
      { new: true }
    );

    res.status(200).json(save);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// unsave post
const unSavePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // check if the current user has not saved this post
    const user = await User.find({
      _id: req.user?._id,
      saved: req.params.id,
    });

    if (user.length === 0) {
      return res.status(400).json({ msg: "You haven't saved this post." });
    }

    // if saved, unsave this post by deleting the post id to the save of the current user
    const unSave = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $pull: { saved: req.params.id },
      },
      { new: true }
    );

    res.status(200).json(unSave);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export { searchUser, getUser, getSuggestionUser, followUser, unfollowUser, savePost, unSavePost };
