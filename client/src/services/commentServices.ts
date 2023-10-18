import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";
import { Comment } from "../utils/interface";

const createComment = async (data: Comment) => {
  const response = await fetch.post("/comment", data, config());
  return response.data;
};

const getComments = async () => {
  const response = await fetch.get("/comment", config());
  return response.data;
};

const likeComment = async (id: string) => {
  const response = await fetch.post(`/comment/like/${id}`, null, config());
  return response.data;
};

const unLikeComment = async (id: string) => {
  const response = await fetch.post(`/comment/unlike/${id}`, null, config());
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  likeComment,
  unLikeComment,
};
export default commentService;
