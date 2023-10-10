import fetch from "../utils/axiosConfig";
import { IUserRegister, IUserLogin, IForgotPassword, IResetPassword } from "../utils/interface";

const register = async (user: IUserRegister) => {
  const response = await fetch.post("/auth/register", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user: IUserLogin) => {
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

const forgotPassword = async (data: IForgotPassword) => {
  const response = await fetch.post("/auth/forgot-password", data);
  return response.data;
};

const resetPassword = async (data: IResetPassword) => {
  const response = await fetch.post("/auth/reset-password/", data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register, login, logout, forgotPassword, resetPassword };

export default authService;
