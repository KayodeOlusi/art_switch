import { useQuery } from "react-query";
import { getPostsByTagSelected } from "services/posts";
import { TAllPostsByTag, TPostByTag } from "services/typings/posts";

export const useGetPostsByTag = (activeTag: string) => {
  return useQuery<TAllPostsByTag, any>(["postByTag", activeTag], () =>
    getPostsByTagSelected(activeTag)
  );
};
