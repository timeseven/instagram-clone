import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import globalStateSlice from "./features/globalStateSlice";
import uploadImgSlice from "./features/uploadImgSlice";
import suggestionUserReducer from "./features/suggestionUserSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const reducer = combineReducers({
  auth: authReducer,
  upload: uploadImgSlice,
  post: postReducer,
  comment: commentReducer,
  suggestionUser: suggestionUserReducer,
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
