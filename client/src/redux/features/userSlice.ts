import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "../../services/userServices";
import { User, userState } from "../../utils/interface";

const initialState: userState = {
  users: [],
  userData: null,
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

export const getUser = createAsyncThunk("user/get-a-user", async (username: string, thunkAPI) => {
  try {
    return await userService.getUser(username);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const savePost = createAsyncThunk("user/save-a-post", async (id: string, thunkAPI) => {
  try {
    return await userService.savePost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unSavePost = createAsyncThunk("user/unsave-a-post", async (id: string, thunkAPI) => {
  try {
    return await userService.unSavePost(id);
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
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.message = "user/get-a-user success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
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
      })
      .addCase(savePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePost.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.message = "success";
      })
      .addCase(savePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(unSavePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unSavePost.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.message = "success";
      })
      .addCase(unSavePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
