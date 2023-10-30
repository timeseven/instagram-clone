import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import {
  createMessageConversationReadSocket,
  createMessageConversationSocket,
  getConversations,
  isReadConversation,
} from "./redux/features/conversationSlice";
import { useLocation } from "react-router-dom";
import { setCreateMessageSocket } from "./redux/features/messagesSlice";

const SocketClient = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { csData } = useSelector((state: RootState) => state.conversation);
  const { sData } = useSelector((state: RootState) => state.socket);

  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  // connect
  useEffect(() => {
    if (sData) {
      const newArr: any = [];
      csData!.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== user?._id) {
            newArr.push({
              ...cv,
              auth: user?._id,
            });
          }
        });
      });
      if (sData) {
        sData!.emit("joinUser", newArr);
      }
    }
  }, [user, csData, sData]);

  // Create a Messages
  useEffect(() => {
    if (sData) {
      sData!.on("createMessageToClient", (msg) => {
        dispatch(setCreateMessageSocket(msg));
        if (location.pathname === `/direct/${msg.conversation}`) {
          dispatch(isReadConversation(msg.conversation));
          dispatch(
            createMessageConversationReadSocket({
              _id: msg.conversation,
              recipients: [msg.sender, msg.recipient],
              lastMessages: msg.text,
              updatedAt: msg.createdAt,
            })
          );
        } else {
          dispatch(
            createMessageConversationSocket({
              _id: msg.conversation,
              recipients: [msg.sender, msg.recipient],
              lastMessages: msg.text,
              updatedAt: msg.createdAt,
            })
          );
        }
        dispatch(getConversations());
      });
      return () => {
        sData!.off("createMessageToClient");
      };
    }
  }, [sData, dispatch, location]);

  return <></>;
};

export default SocketClient;
