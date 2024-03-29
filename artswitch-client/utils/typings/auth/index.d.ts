interface Login_User_Details {
  email: string;
  password: string;
}

interface Login_User_Response {
  id: string | number;
  name: string;
  email: string;
  profilePicture: string;
  token: string;
}
