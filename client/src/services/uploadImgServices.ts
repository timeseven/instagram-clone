import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const uploadImgPost = async (data: FormData) => {
  const response = await fetch.post("/upload/post", data, config());
  console.log("upload", response.data);
  return response.data;
};

const uploadImgServices = {
  uploadImgPost,
};

export default uploadImgServices;
