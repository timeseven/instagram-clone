import fetch from "../utils/axiosConfig";
import { UserRegister } from "../utils/interface";

const register = async (user: UserRegister) => {
  const response = await fetch.post("/auth/register", user);
  console.log("response.data", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register };

export default authService;
