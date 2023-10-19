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
    console.log("createComment", data);
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

export const getCommentsByPost = createAsyncThunk("comment/get-comments-bypost", async (id: string, thunkAPI) => {
  try {
    return await commentService.getCommentsByPost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const likeComment = createAsyncThunk("comment/like-a-comment", async (id: string, thunkAPI) => {
  try {
    return await commentService.likeComment(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unLikeComment = createAsyncThunk("comment/unlike-a-comment", async (id: string, thunkAPI) => {
  try {
    return await commentService.unLikeComment(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteComment = createAsyncThunk("comment/delete-a-comment", async (id: string, thunkAPI) => {
  try {
    return await commentService.deleteComment(id);
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
      })
      .addCase(getCommentsByPost.pending, (state) => {
        console.log("getCommentss");
        state.isLoading = true;
      })
      .addCase(getCommentsByPost.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData = action.payload;
        state.message = "success";
      })
      .addCase(getCommentsByPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(likeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData = state.cData!.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, likes: action.payload.likes };
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(unLikeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unLikeComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData = state.cData!.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, likes: action.payload.likes };
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(unLikeComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cData = state.cData.filter((item) => item._id !== action.payload._id);
        state.message = "success";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});

export default commentSlice.reducer;
