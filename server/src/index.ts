import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import dbConnect from "./config/dbConnect";
import authRouter from "./routes/authRouter";

const app = express();
dotenv.config(); // make .env available
const PORT: string | number = process.env.PORT || 4000;

// connect to db
dbConnect();

// middleware config
app.use(express.json()); // parse incoming requests with JSON payloads
app.use(cookies());

// routes config
app.use("/api/auth", authRouter);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
