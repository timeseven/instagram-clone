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

const commentService = {
  createComment,
  getComments,
};
export default commentService;
