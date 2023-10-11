import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";

const uploadImagesPost = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const urls: string[] = [];
    const files = req.files as Express.Multer.File[];

    for (const file of files) {
      const { path } = file;
      console.log(path);
      urls.push(path);
      fs.unlinkSync(path);
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
