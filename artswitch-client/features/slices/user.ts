import { RootState } from "app/store";
import useCache from "utils/hooks/useCache";
import { prepareUserDetails } from "utils/services/auth";
import { TUserProfile } from "utils/services/typings/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TSingleMessage } from "utils/services/typings/messages";

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
  notifications: TSingleMessage[];
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
  notifications: [],
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
    setNotifications: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification._id !== action.payload
      );
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
export const selectUserDetails = (state: RootState) => state.user;
export const { setSocketState, setNotifications, removeNotification } =
  userSlice.actions;
