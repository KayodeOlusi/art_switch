import Cookies from "js-cookie";
import { store } from "app/store";
import { TUserProfile } from "../typings/user";
import { TResponseBody } from "../typings/posts";
import HttpClient, { handleError, successMessage } from "../client";

const _token = Cookies.get("_token") as string;

export const prepareUserDetails = async () => {
  const res = await HttpClient.getWithToken<TResponseBody<TUserProfile>>(
    "/user/profile",
    _token
  );

  return res?.data;
};

export const loginUser = async (
  user_details: Login_User_Details,
  onSuccess: () => void,
  onError?: () => void
) => {
  try {
    const response = await HttpClient.post<Login_User_Response>(
      "auth/login",
      user_details
    );

    Cookies.set("_token", response?.token);
    successMessage("Login successful");
    onSuccess();
  } catch (error) {
    onError?.();
    handleError(error);
  }
};

export const signupUser = async (
  user_details: Login_User_Details & { name: string; username: string },
  onSuccess: () => void,
  onError?: () => void
) => {
  try {
    const response = await HttpClient.post<Login_User_Response>(
      "auth/signup",
      user_details
    );

    Cookies.set("_token", response?.token);
    successMessage("Signup successful");
    onSuccess();
  } catch (error) {
    onError?.();
    handleError(error);
  }
};

export const verifyUserToken = async () => {
  try {
    const res = await HttpClient.getWithToken("/auth/verify-token", _token);
    return res;
  } catch (error) {}
};
