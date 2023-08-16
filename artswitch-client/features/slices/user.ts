import { prepareUserDetails } from "utils/services/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const response = await prepareUserDetails();
    return response;
  }
);

type TInitialState = {
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  loading: boolean;
  error: boolean;
};

const initialState: TInitialState = {
  user: {
    _id: "",
    name: "",
    username: "",
    email: "",
    profilePicture: "",
  },
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserDetails.rejected, state => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchUserDetails.pending, state => {
      state.loading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
export const selectUserDetails = (state: RootState) => state.user;
