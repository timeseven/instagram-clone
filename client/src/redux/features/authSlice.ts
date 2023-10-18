import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/authServices";
import userService from "../../services/userServices";
import {
  IAuthState,
  User,
  IUserLogin,
  IUserRegister,
  IForgotPassword,
  IResetPassword,
  UserEdit,
} from "../../utils/interface";
import { getTokenFromLocalStorage } from "../../utils/axiosConfig";

const initialState: IAuthState = {
  user: getTokenFromLocalStorage(),
  isError: false, // thunk rejected
  isLoading: false, // thunk pending
  isSuccess: false, // thunk fulfilled
  message: "",
};

/** Thunks */
export const register = createAsyncThunk("auth/register", async (userData: IUserRegister) => {
  // Just make the async request here, and return the response.
  // This will automatically dispatch a `pending` action first,
  // and then `fulfilled` or `rejected` actions based on the promise.
  // as needed based on the
  try {
    return await authService.register(userData);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }
});

export const login = createAsyncThunk("auth/login", async (userData: IUserLogin) => {
  try {
    return await authService.login(userData);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }
});

export const forgotPassword = createAsyncThunk("auth/forgot-password", async (data: IForgotPassword) => {
  try {
    return await authService.forgotPassword(data);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }
});

// clear user state when forgot password email sent by adding null payload
export const setNullUser = createAsyncThunk("auth/set-null", async () => {
  return null;
});

export const resetPassword = createAsyncThunk("auth/reset-password", async (data: IResetPassword) => {
  try {
    return await authService.resetPassword(data);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw error;
    }
  }
});

export const follow = createAsyncThunk("auth/follow", async (id: string, thunkAPI) => {
  try {
    return await userService.followUser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const unFollow = createAsyncThunk("auth/unfollow", async (id: string, thunkAPI) => {
  try {
    return await userService.unFollowUser(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editUser = createAsyncThunk("auth/edit-user", async (userData: UserEdit, thunkAPI) => {
  try {
    return await authService.editUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/** create Slice */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // any additional "normal" case reducers here.
    // these will generate new action creators
    resetUser(state) {
      state.user = initialState.user;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.message = initialState.message;
    },
  },
  extraReducers: (builder) => {
    // Use `extraReducers` to handle actions that were generated
    // _outside_ of the slice, such as thunks or in other slices
    // register builder
    builder // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "An error occured.";
      }) // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "An error occured.";
      }) // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "success";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "An error occured.";
      }) // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "An error occured.";
      }) // set null user
      .addCase(setNullUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setNullUser.fulfilled, (state, action: PayloadAction<null>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(setNullUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      }) // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "An error occurred.";
      })
      .addCase(follow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(follow.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user! = action.payload;
        state.message = "success";
      })
      .addCase(follow.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(unFollow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unFollow.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user! = action.payload;
        state.message = "success";
      })
      .addCase(unFollow.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});

export const { resetUser } = authSlice.actions;

export default authSlice.reducer;
