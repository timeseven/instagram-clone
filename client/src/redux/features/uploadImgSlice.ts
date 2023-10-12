import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import uploadImgService from "../../services/uploadImgServices";
import { uploadImg, uploadImgState } from "../../utils/interface";

const initialState: uploadImgState = {
  imageList: [],
  imgObj: {},
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
    console.log("formData", formData, data);

    return await uploadImgService.uploadImgPost(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getImgPost = createAsyncThunk("upload/get-images-post", async (data: string[], thunkAPI) => {
  try {
    console.log("getImgPost redux", data);
    return await uploadImgService.getImgPost(data);
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
      })
      .addCase(getImgPost.pending, (state) => {
        state.isLoading = true;
        state.message = "upload/transfer-images-post pedding";
      })
      .addCase(getImgPost.fulfilled, (state, action: PayloadAction<Array<uploadImg>>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.imgObj = action.payload;
        console.log("transfer, action payload");
        state.message = "upload/transfer-images-post success";
      })
      .addCase(getImgPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export default uploadImgSlice.reducer;
