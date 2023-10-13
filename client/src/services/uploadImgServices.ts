import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const uploadImgPost = async (data: FormData) => {
  const response = await fetch.post("/upload/post", data, config());
  return response.data;
};

const getImgPost = async (data: string[]) => {
  const response = await fetch.post("/upload/transfer/post", { images: data }, config());
  return response.data;
};

// use post to request deleting post images
const deleteImgPost = async (data: string[]) => {
  console.log("deleImgPost", data);
  const response = await fetch.post("/upload/delete/post", { images: data }, config());
  return response.data;
};

const uploadImgServices = {
  uploadImgPost,
  getImgPost,
  deleteImgPost,
};

export default uploadImgServices;
