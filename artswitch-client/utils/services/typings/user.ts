export type TUserProfile = Omit<TUserAccountDetails, "follow-details">;

export type TSearchUser = {
  message: string;
  data: {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }[];
};

export type TUserAccountDetails = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  "follow-details": {
    followers: string[];
    following: string[];
  };
};
