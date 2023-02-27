import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { axios_auth } from "../axios";

export const loginUser = async (user_details: Login_User_Details) => {
  try {
    const response: Login_User_Response = await axios_auth.post(
      "http://localhost:3000/api/auth/login",
      user_details
    );

    Cookies.set("token", response?.data.token);
    return response?.data;
  } catch (error) {
    error instanceof Error && toast.error(error?.message);
    return;
  }
};

export const signupUser = async (user_details: Login_User_Details) => {
  try {
    const response: Login_User_Response = await axios_auth.post(
      "http://localhost:3000/api/auth/signup",
      user_details
    );

    Cookies.set("token", response?.data.token);
    return response && response?.data;
  } catch (error) {
    error instanceof Error && toast.error(error?.message);
    return;
  }
};
