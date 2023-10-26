import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";
import { ICreateMessage } from "../utils/interface";

const createMessage = async (data: ICreateMessage) => {
  const response = await fetch.post("/messages", data, config());
  return response.data;
};

const getMessages = async (id: string) => {
  const response = await fetch.get(`/messages/${id}`, config());
  return response.data;
};

const deleteMessage = async (id: string) => {
  const response = await fetch.delete(`/messages/delete/${id}`, config());
  return response.data;
};

const messagesService = {
  createMessage,
  getMessages,
  deleteMessage,
};
export default messagesService;
