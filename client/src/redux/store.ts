import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import globalStateSlice from "./features/globalStateSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const reducer = combineReducers({
  auth: authReducer,
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
