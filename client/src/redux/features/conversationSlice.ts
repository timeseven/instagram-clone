import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import conversationService from "../../services/conversationServices";
import { IConversation, INewMessageConversation, conversationState } from "../../utils/interface";

const initialState: conversationState = {
  csData: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const createConversation = createAsyncThunk(
  "conversation/create-a-conversation",
  async (id: string, thunkAPI) => {
    try {
      return await conversationService.createConversation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getConversations = createAsyncThunk("conversation/get-conversations", async (_, thunkAPI) => {
  try {
    return await conversationService.getConversations();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteConversation = createAsyncThunk(
  "conversation/delete-a-conversation",
  async (id: string, thunkAPI) => {
    try {
      return await conversationService.deleteConversation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isReadConversation = createAsyncThunk("conversation/read-conversation", async (id: string, thunkAPI) => {
  try {
    return await conversationService.isReadConversation(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const setIsReadMessageSocket = createAsyncThunk("conversation/is-read-message-socket", async (id: string) => {
  return id;
});

export const deleteConversationSocket = createAsyncThunk(
  "conversation/delete-a-conversation-socket",
  async (obj: IConversation) => {
    return obj;
  }
);
export const createMessageConversationSocket = createAsyncThunk(
  "conversation/create-message-conversation-socket",
  async (data: INewMessageConversation) => {
    return data;
  }
);

export const createMessageConversationReadSocket = createAsyncThunk(
  "conversation/create-message-conversation-read-socket",
  async (data: INewMessageConversation) => {
    return data;
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state, action: PayloadAction<IConversation>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = state.csData.filter((item) => item._id !== action.payload?._id);
        state.csData?.unshift(action.payload);
        state.message = "success";
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.fulfilled, (state, action: PayloadAction<Array<IConversation>>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = action.payload;
        state.message = "success";
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(deleteConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteConversation.fulfilled, (state, action: PayloadAction<IConversation>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = state.csData.filter((obj) => obj._id !== action.payload._id);
        state.message = "success";
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(isReadConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isReadConversation.fulfilled, (state, action: PayloadAction<IConversation>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = state.csData!.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(isReadConversation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(deleteConversationSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteConversationSocket.fulfilled, (state, action: PayloadAction<IConversation>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = state.csData.filter((obj) => obj._id !== action.payload._id);
        state.message = "success";
      })
      .addCase(deleteConversationSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(setIsReadMessageSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setIsReadMessageSocket.fulfilled, (state, action: PayloadAction<string>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.csData = state.csData!.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              isRead: true,
            };
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(setIsReadMessageSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(createMessageConversationSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessageConversationSocket.fulfilled, (state, action: PayloadAction<INewMessageConversation>) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;

        state.csData = state.csData!.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              recipients: action.payload.recipients,
              isRead: false,
              lastMessages: action.payload.lastMessages,
              updatedAt: action.payload.updatedAt,
            };
          } else {
            return item;
          }
        });
        state.message = "success";
      })
      .addCase(createMessageConversationSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      })
      .addCase(createMessageConversationReadSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createMessageConversationReadSocket.fulfilled,
        (state, action: PayloadAction<INewMessageConversation>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.csData = state.csData!.map((item) => {
            if (item._id === action.payload._id) {
              return {
                ...item,
                recipients: action.payload.recipients,
                isRead: true,
                lastMessages: action.payload.lastMessages,
                updatedAt: action.payload.updatedAt,
              };
            } else {
              return item;
            }
          });
          state.message = "success";
        }
      )
      .addCase(createMessageConversationReadSocket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
      });
  },
});
export default conversationSlice.reducer;
