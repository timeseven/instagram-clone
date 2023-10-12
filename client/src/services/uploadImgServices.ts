import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const uploadImgPost = async (data: FormData) => {
  const response = await fetch.post("/upload/post", data, config());
  console.log("upload", response.data);
  return response.data;
};

const getImgPost = async (data: string[]) => {
  console.log("transfer", data);
  const response = await fetch.post("/upload/transfer/post", { images: data }, config());
  return response.data;
};

const uploadImgServices = {
  uploadImgPost,
  getImgPost,
};

export default uploadImgServices;
