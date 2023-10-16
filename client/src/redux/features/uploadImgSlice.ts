import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import uploadImgService from "../../services/uploadImgServices";
import { uploadImgState } from "../../utils/interface";

const initialState: uploadImgState = {
  iData: [],
  imgObj: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// upload post images to cloud(aws s3)
export const uploadImgPost = createAsyncThunk("upload/upload-images-post", async (data: File[], thunkAPI) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("images", data[i]);
    }
    console.log("formData", formData, data);

    return await uploadImgService.uploadImgPost(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// get valid url of post images from cloud(aws s3)
export const getImgPost = createAsyncThunk("upload/get-images-post", async (data: string[], thunkAPI) => {
  try {
    return await uploadImgService.getImgPost(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// delete post images from cloud(aws s3)
export const deleteImgPost = createAsyncThunk("upload/delete-images-post", async (data: string[], thunkAPI) => {
  try {
    console.log("redux deleteImgpost", data);
    return await uploadImgService.deleteImgPost(data);
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
      .addCase(uploadImgPost.fulfilled, (state, action: PayloadAction<Array<string>>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.iData = action.payload;
        state.message = "upload/upload-images-post success";
      })
      .addCase(uploadImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getImgPost.pending, (state) => {
        state.isLoading = true;
        state.message = "upload/transfer-images-post pedding";
      })
      .addCase(getImgPost.fulfilled, (state, action: PayloadAction<Array<Object>>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.imgObj = Object.assign(state.imgObj, action.payload);
        state.message = "upload/transfer-images-post success";
      })
      .addCase(getImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(deleteImgPost.pending, (state) => {
        state.isLoading = true;
        state.message = "upload/delete-images-post pedding";
      })
      .addCase(deleteImgPost.fulfilled, (state, action: PayloadAction<Array<string>>) => {
        console.log("deleteImgPost payload", action);
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.imgObj = Object.fromEntries(
          Object.entries(state.imgObj).filter((item) => !action.payload.includes(item[0]))
        ); // delete valid url from imgObj
        state.message = "upload/delete-images-post success";
      })
      .addCase(deleteImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export default uploadImgSlice.reducer;
