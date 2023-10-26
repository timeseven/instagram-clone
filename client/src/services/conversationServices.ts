import fetch from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const createConversation = async (id: string) => {
  const response = await fetch.post(`/conversation/${id}`, null, config());
  return response.data;
};

const getConversations = async () => {
  const response = await fetch.get("/conversation", config());
  return response.data;
};

const deleteConversation = async (id: string) => {
  const response = await fetch.delete(
    `/conversation/delete/${id}`,

    config()
  );
  return response.data;
};
const isReadConversation = async (id: string) => {
  const response = await fetch.put(`/conversation/${id}`, null, config());
  return response.data;
};

const conversationService = {
  createConversation,
  getConversations,
  deleteConversation,
  isReadConversation,
};
export default conversationService;
