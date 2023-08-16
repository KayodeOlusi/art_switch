import {
  getFeedPosts,
  getSinglePost,
  getPostsByTagSelected,
  getAllPostsForUser,
} from "utils/services/posts";
import {
  TPost,
  TAllPostsByTag,
  TResponseBody,
} from "utils/services/typings/posts";
import { useQuery } from "react-query";

export const useGetPostsByTag = (activeTag: string) => {
  return useQuery<TAllPostsByTag, any>(["postByTag", activeTag], () =>
    getPostsByTagSelected(activeTag)
  );
};

export const useGetFeedPosts = () => {
  return useQuery<TResponseBody<TPost[]>["data"], any>(
    "feed-posts",
    getFeedPosts
  );
};

export const useGetSinglePost = (postId: string) => {
  return useQuery<TResponseBody<TPost>["data"], any>(
    ["single-post", postId],
    () => getSinglePost(postId),
    {
      enabled: !!postId,
    }
  );
};

export const useGetUserPosts = (id: string) => {
  return useQuery<TResponseBody<TPost[]>["data"]>(
    ["user-posts", id],
    () => getAllPostsForUser(id),
    {
      enabled: !!id,
    }
  );
};
