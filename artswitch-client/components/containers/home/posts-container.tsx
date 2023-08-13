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
    if (!data) return [];

    return data;
  }, [data]);

  return (
    <div className="space-y-4" data-testid="post-container">
      <Stories stories={stories} />
      <div data-testid="posts-view" id="post-view" className="space-y-4">
        {allPosts.map(post => (
          <Post {...post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostsContainer;
