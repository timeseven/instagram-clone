import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "AKIAVRIUTPWZILZRRB7G",
    secretAccessKey: "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",
  },
});

export const awsUploadImgPost = async (fileUpload: any) => {
  const fileBuffer = await sharp(fileUpload.path).toBuffer();
  const command = new PutObjectCommand({
    Bucket: "node-instagram-upload-bucket",
    Key: fileUpload.filename,
    Body: fileBuffer,
  });
  try {
    const response = await client.send(command);
    if (response) {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand({
          Bucket: "node-instagram-upload-bucket",
          Key: fileUpload.filename,
        })
      );
      return url || "";
    }
  } catch (err) {
    console.error(err);
  }
};
