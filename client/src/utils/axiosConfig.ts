import axios from "axios";
import { BASE_URL } from "./baseUrl";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// request interceptor
instance.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const getTokenFromLocalStorage: any = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage().token}`,
    Accept: "application/json",
  },
});

export { getTokenFromLocalStorage, config };
export default instance;
