import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import commentService from "../../services/commentServices";
import { Comment, IComment, ICommentState } from "../../utils/interface";

const initialState: ICommentState = {
  cData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createComment = createAsyncThunk("comment/create", async (data: Comment, thunkAPI) => {
  try {
    return await commentService.createComment(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getComments = createAsyncThunk("comment/get-comments", async (_, thunkAPI) => {
  try {
    return await commentService.getComments();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData!.push(action.payload);
        state.message = "success";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getComments.pending, (state) => {
        console.log("getCommentss");
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData = action.payload;
        state.message = "success";
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});

export default commentSlice.reducer;
