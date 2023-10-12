import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { AWS_ACCESS_KEY_ID, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } from "../variables";

const client = new S3Client({
  region: "ap-southeast-2",
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
    const response = await client.send(command);
    if (response) {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand({
          Bucket: AWS_S3_BUCKET_NAME,
          Key: fileUpload.filename,
        })
      );
      return url || "";
    }
  } catch (err) {
    console.error(err);
  }
};
