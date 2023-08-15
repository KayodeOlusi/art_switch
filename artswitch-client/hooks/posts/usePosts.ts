import {
  getFeedPosts,
  getSinglePost,
  getPostsByTagSelected,
} from "services/posts";
import { useQuery } from "react-query";
import { TAllPostsByTag, TPost, TResponseBody } from "services/typings/posts";

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
