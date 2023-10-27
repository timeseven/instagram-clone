import { createSlice } from "@reduxjs/toolkit";
import { IGlobalState } from "../../utils/interface";

const initialState: IGlobalState = {
  isCreatePostGlobal: false,
  isDeletePostGlobal: false,
  isEditPostGlobal: false,
  isCreateMessageGlobal: false,

  isCreateConversationGlobal: false,
  isDeleteConversationGlobal: false,

  isSearchGlobal: false,
  isNotificationGlobal: false,
  isAvatarEditGlobal: false,

  postModalId: null,
  conversationModalId: null,
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
    setIsAvatarEditGlobalTrue(state) {
      state.isAvatarEditGlobal = true;
    },
    setIsAvatarEditGlobalFalse(state) {
      state.isAvatarEditGlobal = false;
    },
    setIsCreateMessageGlobalTrue(state) {
      state.isCreateMessageGlobal = true;
    },
    setIsCreateMessageGlobalFalse(state) {
      state.isCreateMessageGlobal = false;
    },
    setIsCreateConversationGlobalTrue(state) {
      state.isCreateConversationGlobal = true;
    },
    setIsCreateConversationGlobalFalse(state) {
      state.isCreateConversationGlobal = false;
    },
    setIsDeleteConversationGlobalTrue(state) {
      state.isDeleteConversationGlobal = true;
    },
    setIsDeleteConversationGlobalFalse(state) {
      state.isDeleteConversationGlobal = false;
    },
    // Define the setPostId action
    setPostModalId: (state, action) => {
      state.postModalId = action.payload;
    },
    setConversationModalId: (state, action) => {
      state.conversationModalId = action.payload;
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
export const { setIsAvatarEditGlobalTrue } = globalStateSlice.actions;
export const { setIsAvatarEditGlobalFalse } = globalStateSlice.actions;
export const { setIsCreateMessageGlobalTrue } = globalStateSlice.actions;
export const { setIsCreateMessageGlobalFalse } = globalStateSlice.actions;
export const { setIsCreateConversationGlobalTrue } = globalStateSlice.actions;
export const { setIsCreateConversationGlobalFalse } = globalStateSlice.actions;
export const { setIsDeleteConversationGlobalTrue } = globalStateSlice.actions;
export const { setIsDeleteConversationGlobalFalse } = globalStateSlice.actions;
export const { setPostModalId } = globalStateSlice.actions;
export const { setConversationModalId } = globalStateSlice.actions;

export default globalStateSlice.reducer;
