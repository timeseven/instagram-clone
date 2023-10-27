import { createSlice } from "@reduxjs/toolkit";
import { SocketState } from "../../utils/interface";

const initialState: SocketState = {
  sData: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    setSocket: (state, action) => {
      state.sData = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
