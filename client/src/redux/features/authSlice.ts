import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/authServices";
import { AuthState, User, UserLogin, UserRegister } from "../../utils/interface";
import { getTokenFromLocalStorage } from "../../utils/axiosConfig";

const initialState: AuthState = {
  user: getTokenFromLocalStorage(),
  isError: false, // thunk rejected
  isLoading: false, // thunk pending
  isSuccess: false, // thunk fulfilled
  message: "",
};

/** Thunks */
export const register = createAsyncThunk("auth/register", async (userData: UserRegister) => {
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

export const login = createAsyncThunk("auth/login", async (userData: UserLogin) => {
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

/** create Slice */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // any additional "normal" case reducers here.
    // these will generate new action creators
  },
  extraReducers: (builder) => {
    // Use `extraReducers` to handle actions that were generated
    // _outside_ of the slice, such as thunks or in other slices
    // register builder
    builder
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
      })
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
      })
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
      });
  },
});

export default authSlice.reducer;
