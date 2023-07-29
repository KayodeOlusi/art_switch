export type TPostByTag = {
  id: string;
  image: string;
  tags: string[];
  caption: string;
  userId: string;
  likes: string[];
  createdAt: string;
};

export type TAllPostsByTag<T> = {
  message: string;
  data: T[];
};

export type TCreatePostBody = {
  caption: string;
  image?: string;
  tags: string[];
};
