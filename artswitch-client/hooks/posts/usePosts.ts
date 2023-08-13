import { useQuery } from "react-query";
import { getFeedPosts, getPostsByTagSelected } from "services/posts";
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
