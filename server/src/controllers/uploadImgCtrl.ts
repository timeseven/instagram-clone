import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import getPath from "path";
import { awsDeleteImgPost, awsGetImgPost, awsUploadImgPost } from "../utils/awsS3";

const uploadImagesPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const urls: string[] = [];
    const files = req.files as Express.Multer.File[];

    for (const file of files) {
      const { path } = file;
      const cloudPath = await awsUploadImgPost(file);
      urls.push(cloudPath!);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.status(200).json(images);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const getImagesPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const { images } = req.body;
    const urls: any = {};
    for (const image of images) {
      const cloudUrl = await awsGetImgPost(image);
      urls[`${image}`] = cloudUrl;
    }
    res.status(200).json(urls);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

const deleteImagesPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = awsDeleteImgPost(id);

    res.json({ public_id: id });
  } catch (error: any) {
    throw new Error(error);
  }
});

export { uploadImagesPost, deleteImagesPost, getImagesPost };
