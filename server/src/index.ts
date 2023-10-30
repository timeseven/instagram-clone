import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import notificationRouter from "./routes/notificationRouter";
import messagesRouter from "./routes/messagesRouter";
import conversationRouter from "./routes/conversationRouter";
import SocketServer from "./socketServer";

const app = express();
const httpServer = createServer(app);
dotenv.config(); // make .env available
const PORT: string | number = process.env.PORT || 4000;
const io = new Server(httpServer, {
  cors: { origin: process.env.URL_FRONTEND },
});

// connect to db
dbConnect();

//socket
io.on("connection", (socket) => {
  SocketServer(socket);
});

// middleware config
app.use(express.json({ limit: "1000mb" })); // parse incoming requests with JSON payloads
app.use(cookies());
app.use(cors({ credentials: true, origin: process.env.URL_FRONTEND }));

// routes config
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/conversation", conversationRouter);

// listen for requests
httpServer.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
