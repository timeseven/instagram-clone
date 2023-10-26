import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel";
import Messages from "../models/messagesModel";

import { IReqAuth } from "../config/interface";

const createConversation = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const existingConversation = await Conversation.findOne({
      $or: [{ recipients: [req.user!._id, req.params.id] }, { recipients: [req.params.id, req.user!._id] }],
    }).populate("recipients", "avatar username fullname");

    if (existingConversation) {
      res.json(existingConversation);
    } else {
      const newConversation = new Conversation({
        recipients: [req.user!._id, req.params.id],
      });
      await newConversation.save();

      const populatedConversation = await Conversation.findById(newConversation._id).populate(
        "recipients",
        "avatar username fullname"
      );

      res.status(200).json(populatedConversation);
    }
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const deleteConversation = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const newConver = await Conversation.findOneAndDelete({
      _id: req.params.id,
    });
    await Messages.deleteMany({ conversation: newConver!._id });

    res.status(200).json(newConver);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const getConversation = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const conversations = await Conversation.find({
      recipients: req.user!._id,
    })
      .sort({ updatedAt: -1 })
      .populate("recipients", "avatar username fullname");

    res.status(200).json(conversations);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const getAConversation = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const conversations = await Conversation.find({
      _id: req.params.id,
    }).populate("recipients", "avatar username fullname");

    res.status(200).json(conversations);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});
const isReadConversation = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const msg = await Conversation.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { isRead: true },
      { new: true }
    ).populate("recipients", "avatar username fullname");

    res.status(200).json(msg);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export { createConversation, deleteConversation, getConversation, getAConversation, isReadConversation };
