import { RootState } from "app/store";
import useCache from "utils/hooks/useCache";
import { prepareUserDetails } from "utils/services/auth";
import { TUserProfile } from "utils/services/typings/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { getCache, setCache } = useCache();

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    if (getCache("user")) {
      return getCache("user") as TUserProfile;
    } else {
      const response = await prepareUserDetails();
      setCache("user", response);
      return response;
    }
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
  socketConnected: boolean;
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
  socketConnected: false,
  error: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSocketState: (state, action) => {
      state.socketConnected = action.payload;
    },
  },
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
export const { setSocketState } = userSlice.actions;
export const selectUserDetails = (state: RootState) => state.user;
