import axios from "axios";
import Cookies from "js-cookie";

export const login_user = async (user_details: Login_User_Details) => {
  try {
    const response: Login_User_Response = await axios.post(
      "http://localhost:5000/api/auth/login",
      user_details
    );

    Cookies.set("token", response?.data.token);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
