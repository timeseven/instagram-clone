import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Messages from "../models/messagesModel";
import Conversation from "../models/conversationModel";

import { IReqAuth } from "../config/interface";

const createMessages = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const { sender, recipient, text, media, call } = req.body;
    if (!recipient || (text === "" && media === "" && !call)) return;
    const newConversation = await Conversation.findOneAndUpdate(
      {
        $or: [{ recipients: [sender, recipient] }, { recipients: [recipient, sender] }],
      },
      {
        recipients: [sender, recipient],
        isRead: false,
        lastMessages: text,
      },
      { new: true }
    );
    const newMessage = new Messages({
      conversation: newConversation!._id,
      sender,
      call,
      recipient,
      text,
      media,
    });

    await (await newMessage.save()).populate("recipient sender", "avatar username fullname");

    res.status(200).json(newMessage);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const getMessages = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const messages = await Messages.find({
      conversation: req.params.id,
    })
      .sort("-createdAt")
      .populate("recipient sender", "avatar username fullname");
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});
const deleteMessages = asyncHandler(async (req: IReqAuth, res: Response): Promise<void> => {
  try {
    const deleteMessages = await Messages.findOneAndDelete({
      _id: req.params.id,
      sender: req.user!._id,
    });
    res.status(200).json(deleteMessages);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export { createMessages, getMessages, deleteMessages };
