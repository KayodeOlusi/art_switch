export type TPostByTag = {
  id: string;
  image: string;
  tags: string[];
  caption: string;
  userId: string;
  likes: string[];
  createdAt: string;
};

export type TAllPostsByTag = {
  message: string;
  data: TPostByTag[];
};

export type TCreatePostBody = {
  caption: string;
  image?: string;
  tags: string[];
};
