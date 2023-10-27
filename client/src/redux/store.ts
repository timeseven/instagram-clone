import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import globalStateSlice from "./features/globalStateSlice";
import suggestionUserReducer from "./features/suggestionUserSlice";
import notificationReducer from "./features/notificationSlice";
import conversationReducer from "./features/conversationSlice";
import messagesReducer from "./features/messagesSlice";
import socketReducer from "./features/socketSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  suggestionUser: suggestionUserReducer,
  notification: notificationReducer,
  conversation: conversationReducer,
  messages: messagesReducer,
  socket: socketReducer,
  globalState: globalStateSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
