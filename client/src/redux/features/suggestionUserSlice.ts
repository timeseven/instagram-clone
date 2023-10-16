import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { User, suggestionUserState } from "../../utils/interface";

const initialState: suggestionUserState = {
  sUser: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getSuggestionUser = createAsyncThunk("suggestion/get-suggestion-user", async (_, thunkAPI) => {
  try {
    return await userService.getSuggestionUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const suggestionUserSlice = createSlice({
  name: "suggestion",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuggestionUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.sUser = action.payload;
        state.message = "user/get-suggestion-user success";
      })
      .addCase(getSuggestionUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});

export default suggestionUserSlice.reducer;
