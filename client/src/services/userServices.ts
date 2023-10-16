import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const getSuggestionUser = async () => {
  const response = await fetch.get("/user/suggestions", config());

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

const userService = {
  getSuggestionUser,
  followUser,
  unFollowUser,
};

export default userService;
