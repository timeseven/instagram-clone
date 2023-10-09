import fetch from "../utils/axiosConfig";
import { UserRegister, UserLogin } from "../utils/interface";

const register = async (user: UserRegister) => {
  const response = await fetch.post("/auth/register", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: UserLogin) => {
  const response = await fetch.post("/auth/login", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  await fetch.post("/auth/logout");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const authService = { register, login, logout };

export default authService;
