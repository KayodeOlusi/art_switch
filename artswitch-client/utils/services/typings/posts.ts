export type TResponseBody<T> = {
  message: string;
  data: T;
};

export type TGetCommentsForPost = {
  _id: string;
  comment: string;
  postId: string;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  createdAt: string;
};

export type TPost = {
  _id: string;
  image: string;
  tags: string[];
  caption: string;
  userId: string;
  likes: string[];
  createdAt: string;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
  };
};

export type TAllPostsByTag = {
  message: string;
  data: TPost[];
};

export type TCreatePostBody = {
  caption: string;
  image?: string;
  tags: string[];
};
