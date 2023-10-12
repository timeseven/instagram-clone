import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import getPath from "path";
import { awsUploadImgPost } from "../utils/awsS3";

const uploadImagesPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const urls: string[] = [];
    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      const { path, destination } = file;
      const pathSplit = path.split("assets");
      const newPath = pathSplit[0] + `assets\\images` + pathSplit[1]; // redir to resize images
      const newDes = destination + "\\images";
      file.path = newPath;
      file.destination = newDes;
      const cloudPath = await awsUploadImgPost(file);
      console.log(typeof cloudPath, cloudPath);
      urls.push(cloudPath!);
      fs.unlinkSync(newPath);
    }
    const images = urls.map((file) => {
      return { url: file };
    });
    res.status(200).json(images);
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
});

export { uploadImagesPost };
