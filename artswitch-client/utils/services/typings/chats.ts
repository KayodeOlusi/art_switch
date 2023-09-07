export type TGetAllUserChats = {
  _id: string;
  chat: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  updatedAt: string;
  latestMessage: {
    _id: string;
    sender: {
      _id: string;
      name: string;
      username: string;
      profilePicture: string;
    };
    content: string;
  };
  users: [
    {
      _id: string;
      name: string;
      username: string;
      email: string;
      profilePicture: string;
      createdAt: string;
      updatedAt: string;
    },
    {
      _id: string;
      name: string;
      username: string;
      email: string;
      profilePicture: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
};
