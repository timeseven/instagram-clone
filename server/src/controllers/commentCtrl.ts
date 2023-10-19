import { Response } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

import { IReqAuth } from "../config/interface";

// create comment
const createComment = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const { postId, content, tag, reply } = req.body;
    console.log(reply, "sdfsdf");
    // check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ msg: "This post does not exist." });
    }

    // check if the reply comment exists before commenting
    if (reply) {
      const cm = await Comment.findById(reply);
      if (!cm) {
        return res.status(400).json({ msg: "This comment does not exist." });
      }
    }

    // create new comment
    const newComment = new Comment({
      user: req.user?._id,
      content,
      tag,
      reply,
      postId,
    });

    // push new comment id to the comments of the post
    await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    //save to database
    await (await newComment.populate("user", "avatar username fullname followers following")).save();

    res.status(200).json(newComment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get comments from this current user and his following
const getComments = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    // get all post ids from the current user and his following
    const posts = await Post.find({
      user: [...req.user!.following, req.user?._id],
    });
    const postIds = posts.map((post) => post._id);

    // get commetns according to these post ids
    const comments = await Comment.find({
      postId: { $in: postIds },
    }).populate("user", "avatar username fullname followers following");

    res.status(200).json(comments);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// get comments from the certain post
const getCommentsByPost = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const comment = await Comment.find({
      postId: req.params.id,
    }).populate("user", "avatar username fullname followers following");

    res.status(200).json(comment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// like comment
const likeComment = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const comment = await Comment.find({
      _id: req.params.id,
      likes: { $nin: req.user?._id },
    });

    if (comment.length === 0) {
      return res.status(400).json({ msg: "This comment does not exist or You already liked the post." });
    }

    // put the current user id into the like of comment
    const likeComment = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: { likes: req.user?._id },
      },
      { new: true }
    );

    res.status(200).json(likeComment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const unLikeComment = asyncHandler(async (req: IReqAuth, res: Response): Promise<any | void> => {
  try {
    const comment = await Comment.find({
      _id: req.params.id,
      likes: { $in: req.user?._id },
    });

    if (comment.length === 0) {
      return res.status(400).json({ msg: "This comment does not exist or You didn't like the post." });
    }

    const unlikeComment = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: { likes: req.user?._id },
      },
      { new: true }
    );

    res.status(200).json(unlikeComment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// update comment
const updateComment = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const { id, content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: id },
      {
        content,
      },
      { new: true }
    ).populate("user", "avatar username fullname followers following");

    res.status(200).json(comment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

// delete comment
const deleteComment = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });

    await Post.findOneAndUpdate(
      { _id: comment!.postId },
      {
        $pull: { comments: req.params.id },
      }
    );

    res.status(200).json(comment);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export { createComment, getComments, likeComment, unLikeComment, updateComment, deleteComment, getCommentsByPost };
