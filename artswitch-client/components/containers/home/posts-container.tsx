import React from "react";
import Post from "@/components/home/posts/post";
import { useAppSelector } from "../../../app/hooks";
import Stories from "@/components/home/posts/stories";
import { selectStories } from "../../../features/slices/stories";
import { useGetFeedPosts } from "hooks/posts/usePosts";

const PostsContainer = () => {
  const stories = useAppSelector(selectStories);
  const { data, isLoading, error } = useGetFeedPosts();

  const allPosts = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data;
  }, [data]);

  return (
    <div className="space-y-4">
      <Stories stories={stories} />
      {allPosts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsContainer;
