import { createSlice } from "@reduxjs/toolkit";
import { IGlobalState } from "../../utils/interface";

const initialState: IGlobalState = {
  isCreatePostGlobal: false,
  isDeletePostGlobal: false,
  isEditPostGlobal: false,

  isSearchGlobal: false,
  isNotificationGlobal: false,

  postModalId: null,
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    setIsCreatePostGlobal(state) {
      state.isCreatePostGlobal = !state.isCreatePostGlobal;
    },
    setIsDeletePostGlobal(state) {
      state.isDeletePostGlobal = !state.isDeletePostGlobal;
    },
    setIsEditPostGlobal(state) {
      state.isEditPostGlobal = !state.isEditPostGlobal;
    },
    setIsSearchGlobalTrue(state) {
      state.isSearchGlobal = true;
    },
    setIsSearchGlobalFalse(state) {
      state.isSearchGlobal = false;
    },
    setIsNotificationGlobalTrue(state) {
      state.isNotificationGlobal = true;
    },
    setIsNotificationGlobalFalse(state) {
      state.isNotificationGlobal = false;
    },
    // Define the setPostId action
    setPostModalId: (state, action) => {
      state.postModalId = action.payload;
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { setIsCreatePostGlobal } = globalStateSlice.actions;
export const { setIsDeletePostGlobal } = globalStateSlice.actions;
export const { setIsEditPostGlobal } = globalStateSlice.actions;
export const { setIsSearchGlobalTrue } = globalStateSlice.actions;
export const { setIsSearchGlobalFalse } = globalStateSlice.actions;
export const { setIsNotificationGlobalTrue } = globalStateSlice.actions;
export const { setIsNotificationGlobalFalse } = globalStateSlice.actions;
export const { setPostModalId } = globalStateSlice.actions;

export default globalStateSlice.reducer;
