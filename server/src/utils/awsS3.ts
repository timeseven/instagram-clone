import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { AWS_ACCESS_KEY_ID, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY, AWS_REGION } from "../variables";

const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const awsUploadImgPost = async (fileUpload: any) => {
  const fileBuffer = await sharp(fileUpload.path).toBuffer();
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: fileUpload.filename,
    Body: fileBuffer,
  });
  try {
    await sharp.cache(false);
    const response = await client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      console.log(response);
      return fileUpload.filename;
    }
  } catch (err) {
    console.error(err);
  }
};

export const awsGetImgPost = async (filename: string) => {
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: filename,
  });
  try {
    const url = await getSignedUrl(client, command);
    return url;
  } catch (err) {
    console.log(err);
  }
};

export const awsDeleteImgPost = async (filename: string) => {
  console.log(filename);
  const command = new DeleteObjectCommand({
    Bucket: AWS_S3_BUCKET_NAME,
    Key: filename,
  });
  try {
    const response = await client.send(command);
    console.log("delete", response);
  } catch (err) {
    console.log(err);
  }
};
