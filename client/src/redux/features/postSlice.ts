import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import postService from "../../services/postServices";
import { IComment, IPost, postState, ICreatePost, postUpdate } from "../../utils/interface";

const initialState: postState = {
  pData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createPost = createAsyncThunk("post/create", async (data: ICreatePost, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("content", data.content);
    for (let i = 0; i < data.medias.length; i++) {
      formData.append("postMedia", data.medias[i]);
    }
    return await postService.createPost(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getPost = createAsyncThunk("post/get-current-post", async (_, thunkAPI) => {
  try {
    return await postService.getPost();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk("post/delete-a-post", async (id: string, thunkAPI) => {
  try {
    return await postService.deletePost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk("post/update-a-post", async (data: postUpdate, thunkAPI) => {
  try {
    return await postService.updatePost(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUserPost = createAsyncThunk("post/get-user-post", async (username: string, thunkAPI) => {
  try {
    return await postService.getUserPost(username);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAPost = createAsyncThunk("post/get-a-post", async (id: string, thunkAPI) => {
  try {
    return await postService.getAPost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const likePost = createAsyncThunk("post/like-a-post", async (id: string, thunkAPI) => {
  try {
    return await postService.likePost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unLikePost = createAsyncThunk("post/unlike-a-post", async (id: string, thunkAPI) => {
  try {
    return await postService.unLikePost(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getExplorePosts = createAsyncThunk("post/get-explore-post", async (_, thunkAPI) => {
  try {
    return await postService.getExplorePosts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getSavePost = createAsyncThunk("post/get-saved-posts", async (username: string, thunkAPI) => {
  try {
    return await postService.getSavePost(username);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const setGetPostSocket = createAsyncThunk("post/get-post-socket", async (post: IPost) => {
  return post;
});
export const setGetCommentPostSocket = createAsyncThunk("post/get-comment-post-socket", async (comment: IComment) => {
  return comment;
});

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData!.unshift(action.payload);
        state.message = "post/create-current-post success";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = action.payload;
        state.message = "post/get-current-post success";
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPost.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = action.payload;
        state.message = "post/get-user-post success";
      })
      .addCase(getUserPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPost.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = action.payload;
        state.message = "success";
      })
      .addCase(getAPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = state.pData!.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, likes: action.payload.likes };
          } else {
            return item;
          }
        });

        state.message = "success";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(unLikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unLikePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = state.pData!.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, likes: action.payload.likes };
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(unLikePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = state.pData!.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        });

        state.message = "success";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = state.pData.filter((item) => item._id !== action.payload._id);

        state.message = "success";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getExplorePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExplorePosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = action.payload;
        state.message = "post/get-explore-post success";
      })
      .addCase(getExplorePosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getSavePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavePost.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = action.payload;
        state.message = "post/get-saved-posts success";
      })
      .addCase(getSavePost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(setGetPostSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGetPostSocket.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData = state.pData!.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        });

        state.message = "success";
      })
      .addCase(setGetPostSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(setGetCommentPostSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGetCommentPostSocket.fulfilled, (state, action: PayloadAction<IComment>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.pData!.map((item) => {
          if (item._id === action.payload.postId) {
            return item.comments.push(action.payload._id);
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(setGetCommentPostSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export default postSlice.reducer;
