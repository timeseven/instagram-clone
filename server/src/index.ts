import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import uploadImgRouter from "./routes/uploadImgRouter";
import notificationRouter from "./routes/notificationRouter";

const app = express();
dotenv.config(); // make .env available
const PORT: string | number = process.env.PORT || 4000;

// connect to db
dbConnect();

// middleware config
app.use(express.json({ limit: "200mb" })); // parse incoming requests with JSON payloads
app.use(cookies());
app.use(cors({ credentials: true, origin: process.env.URL_FRONTEND }));

// routes config
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/upload", uploadImgRouter);
app.use("/api/notification", notificationRouter);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
