import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Post from "../models/postModel";
import User from "../models/userModel";
import { IReqAuth } from "../config/interface";

// create Post
const createPost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const { content, images } = req.body;

    // check if the images are uploaded
    if (images.length === 0) {
      return res.status(400).json({ msg: "Please upload your images" });
    }

    // create new post
    const newPost = new Post({
      content,
      images,
      user: req.user?._id,
    });

    // link post id to the post of current user
    await User.findOneAndUpdate(
      {
        _id: req.user?._id,
      },
      { $push: { post: newPost._id } },
      { new: true }
    );

    //save new post to database
    await (await newPost.populate("user", "avatar username fullname followers")).save();

    res.status(200).json(newPost);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get Posts from the current user and his following
const getPosts = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const posts = await Post.find({
      user: [req.user?._id, ...req.user!.following],
    })
      .sort("-createdAt")
      .populate("user", "avatar username fullname followers");

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get One Post
const getOnePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const post = await Post.find({
      _id: req.params?.id,
    }).populate("user", "avatar username fullname followers");

    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get Explore Posts, get posts from suggestion users
const getExplorePosts = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const currentUser = await User.findById(req.user?.id);
    const following = currentUser?.following;

    // Retrieve 5 users who are not followed by the current user
    const users = await User.find({
      _id: { $ne: currentUser?._id, $nin: following },
    });

    const posts = await Post.find({ user: { $in: users } }).populate("user", "avatar username fullname followers");

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get User Posts, get posts according to username
const getUserPosts = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ user: user?._id })
      .sort("-createdAt")
      .populate("user", "avatar username fullname followers");

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get Save Posts, get save posts according to post id in the save of the current user
const getSavedPost = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ _id: { $in: user!.saved } })
      .sort("-createdAt")
      .populate("user", "avatar username fullname followers");

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// like post
const likePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const post = await Post.find({ _id: req.params?.id, likes: { $nin: req.user?._id } });

    if (post.length === 0) {
      return res.status(400).json({ msg: "This post does not exist or this user already liked the post." });
    }

    // put the current user id into the like of post
    const likePost = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: { likes: req.user?._id },
      },
      { new: true }
    );

    res.status(200).json(likePost);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// unlike post
const unlikePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const post = await Post.find({ _id: req.params?.id, likes: { $in: req.user?._id } });

    if (post.length === 0) {
      return res.status(400).json({ msg: "This post does not exist or this user didn't like it before." });
    }

    // put the current user id into the like of post
    const unlikePost = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: { likes: req.user?._id },
      },
      { new: true }
    );

    res.status(200).json(unlikePost);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// update post
const updatePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const { id, content, images } = req.body;

    // update the post
    const post = await Post.findOneAndUpdate(
      {
        _id: id,
      },
      {
        content,
        images,
      },
      { new: true }
    ).populate("user", "avatar username fullname followers");

    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// delete post
const deletePost = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    // find the post and delete
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });

    // delete the post id in the post of user
    await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        $pull: { post: post?._id },
      },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export {
  createPost,
  getPosts,
  getOnePost,
  getExplorePosts,
  getUserPosts,
  getSavedPost,
  likePost,
  unlikePost,
  updatePost,
  deletePost,
};
