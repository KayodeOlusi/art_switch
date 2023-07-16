import Cookies from "js-cookie";
import HttpClient, { handleError, successMessage } from "../client";

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
  user_details: Login_User_Details & { name: string },
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
