export type TResponseBody<T> = {
  message: string;
  data: T;
};

export type TPost = {
  _id: string;
  image: string;
  tags: string[];
  caption: string;
  userId: string;
  likes: string[];
  createdAt: string;
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
