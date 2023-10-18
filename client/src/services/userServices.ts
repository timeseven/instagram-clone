import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const getSuggestionUser = async () => {
  const response = await fetch.get("/user/suggestions", config());

  return response.data;
};

const getUser = async (username: string) => {
  const response = await fetch.get(`/user/${username}`, config());
  return response.data;
};

const followUser = async (id: string) => {
  const response = await fetch.post(`/user/follow/${id}`, null, config());
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const unFollowUser = async (id: string) => {
  const response = await fetch.post(`/user/unfollow/${id}`, null, config());

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const searchUser = async (search: string) => {
  const response = await fetch.get(`/user/search?username=${search}`);
  return response.data;
};

const savePost = async (id: string) => {
  const response = await fetch.post(`/user/save-post/${id}`, null, config());
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const unSavePost = async (id: string) => {
  const response = await fetch.post(`/user/unsave-post/${id}`, null, config());
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const userService = {
  getSuggestionUser,
  followUser,
  unFollowUser,
  searchUser,
  savePost,
  unSavePost,
  getUser,
};

export default userService;
