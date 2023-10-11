import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import uploadImgService from "../../services/uploadImgServices";
import { uploadImg, uploadImgState } from "../../utils/interface";

const initialState: uploadImgState = {
  imageList: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadImgPost = createAsyncThunk("upload/upload-images-post", async (data: File[], thunkAPI) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("images", data[i]);
    }
    return await uploadImgService.uploadImgPost(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const uploadImgSlice = createSlice({
  name: "upload",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImgPost.pending, (state) => {
        state.isLoading = true;
        state.message = "upload/upload-images-post pedding";
      })
      .addCase(uploadImgPost.fulfilled, (state, action: PayloadAction<Array<uploadImg>>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.imageList = action.payload;
        state.message = "upload/upload-images-post success";
      })
      .addCase(uploadImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export default uploadImgSlice.reducer;
