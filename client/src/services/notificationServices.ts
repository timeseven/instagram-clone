import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";
import { ICreateNotification } from "../utils/interface";

// Create notification
const createNotification = async (data: ICreateNotification) => {
  const response = await fetch.post("/notification", data, config());
  return response.data;
};

// Get notification
const getNotification = async () => {
  const response = await fetch.get("/notification", config());
  return response.data;
};

// Delete notification
const deleteNotification = async (id: string) => {
  const response = await fetch.delete(
    `/notification/${id}`,

    config()
  );
  return response.data;
};

// Is Read Notification
const isReadNotification = async (id: string) => {
  const response = await fetch.put(
    `/notification/${id}`,
    null,

    config()
  );
  return response.data;
};

const postService = {
  createNotification,
  getNotification,
  deleteNotification,
  isReadNotification,
};

export default postService;
