import React from "react";
import Post from "@/components/home/posts/post";
import { useAppSelector } from "../../../app/hooks";
import Stories from "@/components/home/posts/stories";
import { useGetFeedPosts } from "utils/hooks/posts/usePosts";
import { selectStories } from "features/slices/stories";
import { SpinnerLoader } from "@/components/global/loader";

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
        {isLoading && (
          <div className="flex items-center justify-center w-full mt-6">
            <SpinnerLoader size={30} color="#000" className="mx-auto" />
          </div>
        )}
        {error && !data && (
          <div className="text-center" role="alert">
            Error fetching posts. Please try again.
          </div>
        )}

        {!error && !isLoading && allPosts.length > 0 ? (
          allPosts?.map(post => <Post {...post} key={post._id} />)
        ) : (
          <p className="text-center">
            No posts to show. Follow some artists to see their posts here.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostsContainer;
