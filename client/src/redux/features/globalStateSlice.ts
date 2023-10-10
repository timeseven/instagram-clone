import { createSlice } from "@reduxjs/toolkit";
import { IGlobalState } from "../../utils/interface";

const initialState: IGlobalState = {
  isCreatePostGlobal: false,
};

const globalStateSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    setIsCreatePostGlobal(state) {
      state.isCreatePostGlobal = !state.isCreatePostGlobal;
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { setIsCreatePostGlobal } = globalStateSlice.actions;

export default globalStateSlice.reducer;
