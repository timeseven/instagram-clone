import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";
import { ICreatePost, postUpdate } from "../utils/interface";

const createPost = async (data: ICreatePost) => {
  const response = await fetch.post("/post", data, config());
  if (response.data) {
    let userData = JSON.parse(localStorage.getItem("user")!);
    userData.post.push(response.data._id);
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return response.data;
};
const getPost = async () => {
  const response = await fetch.get("/post", config());
  return response.data;
};
const getUserPost = async (username: string) => {
  const response = await fetch.get(`/post/user/${username}`, config());
  return response.data;
};
const getExplorePosts = async () => {
  const response = await fetch.get(`/post/explore`, config());
  return response.data;
};
const getAPost = async (id: string) => {
  const response = await fetch.get(`/post/${id}`, config());
  return response.data;
};
const likePost = async (id: string) => {
  const response = await fetch.put(`/post/like/${id}`, null, config());
  return response.data;
};
const unLikePost = async (id: string) => {
  const response = await fetch.put(`/post/unlike/${id}`, null, config());
  return response.data;
};
const updatePost = async (data: postUpdate) => {
  const response = await fetch.put("/post/update", data, config());
  return response.data;
};
const deletePost = async (id: string) => {
  const response = await fetch.delete(`/post/delete/${id}`, config());
  if (response.data) {
    let userData = JSON.parse(localStorage.getItem("user")!);
    let filterPost = userData.post.filter((item: string) => item !== response.data._id);
    userData.post = filterPost;
    localStorage.setItem("user", JSON.stringify(userData));
  }
  return response.data;
};

const getSavePost = async (username: string) => {
  const response = await fetch.get(`/post/save/${username}`, config());
  return response.data;
};
const postService = {
  createPost,
  getPost,
  getUserPost,
  getAPost,
  likePost,
  unLikePost,
  updatePost,
  deletePost,
  getExplorePosts,
  getSavePost,
};
export default postService;
