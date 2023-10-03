import mongoose from "mongoose";

const dbConnect = (): void => {
  try {
    mongoose.connect(process.env.MONGODB_URI as string).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    console.log("Database Error", error);
  }
};

export default dbConnect;
