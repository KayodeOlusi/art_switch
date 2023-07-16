import { useQuery } from "react-query";
import { getPostsByTagSelected } from "services/posts";
import { TPostByTag } from "services/typings/posts";

export const useGetPostsByTag = (activeTag: string) => {
  return useQuery<TPostByTag[], any>(["postByTag", activeTag], () =>
    getPostsByTagSelected(activeTag)
  );
};
