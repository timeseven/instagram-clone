import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { User, userState } from "../../utils/interface";

const initialState: userState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const searchUser = createAsyncThunk("search/get-users", async (username: string, thunkAPI) => {
  try {
    return await userService.searchUser(username);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "suggestion",
  initialState: initialState,
  reducers: {
    // reset user data
    resetUser(state) {
      state.users = initialState.users;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.message = initialState.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.message = "user/get-suggestion-user success";
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
