import { createSlice } from "@reduxjs/toolkit";
import { IGlobalState } from "../../utils/interface";

const initialState: IGlobalState = {
  isCreatePostGlobal: false,
  isDeletePostGlobal: false,

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
      console.log(state.isDeletePostGlobal);
      state.isDeletePostGlobal = !state.isDeletePostGlobal;
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
export const { setPostModalId } = globalStateSlice.actions;

export default globalStateSlice.reducer;
