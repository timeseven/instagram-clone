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
  const response = await fetch.put(`/comment/like/${id}`, null, config());
  return response.data;
};

const unLikeComment = async (id: string) => {
  const response = await fetch.put(`/comment/unlike/${id}`, null, config());
  return response.data;
};

const getCommentsByPost = async (id: string) => {
  const response = await fetch.get(`/comment/${id}`, config());
  return response.data;
};

const deleteComment = async (id: string) => {
  const response = await fetch.delete(`/comment/delete/${id}`, config());
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  likeComment,
  unLikeComment,
  getCommentsByPost,
  deleteComment,
};
export default commentService;
