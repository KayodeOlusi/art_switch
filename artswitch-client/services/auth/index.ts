import Cookies from "js-cookie";
import { axios_auth } from "../axios";

export const login_user = async (user_details: Login_User_Details) => {
  try {
    const response: Login_User_Response = await axios_auth.post(
      "http://localhost:5000/api/auth/login",
      user_details
    );

    Cookies.set("token", response?.data.token);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup_user = async (user_details: Login_User_Details) => {
  try {
    const response: Login_User_Response = await axios_auth.post(
      "http://localhost:5000/api/auth/signup",
      user_details
    );

    Cookies.set("token", response?.data.token);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
