import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer"; //handling multipart/form-data, primarily used for uploading files
import sharp from "sharp"; // convert large images in common formats to smaller
import path from "path";
import fs from "fs";

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../assets/images"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // accept
  } else {
    cb(null, false); // reject
  }
};

export const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

// resize image middleware, not necessary
export const imgResize = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as Express.Multer.File[];

  if (!files) return next();

  // if files exists, use Promise.all to check if the async resize of all files are successful.
  await Promise.all(
    files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`src/assets/images/${file.filename}`);
      fs.unlinkSync(`src/assets/${file.filename}`); // delete original images
    })
  );
  next();
};
