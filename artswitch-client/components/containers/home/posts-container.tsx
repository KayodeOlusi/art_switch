import React from "react";
import Post from "@/components/home/posts/post";
import Stories from "@/components/home/posts/stories";
import { useAppSelector } from "../../../app/hooks";
import { selectStories } from "../../../features/slices/stories";

const PostsContainer = () => {
  const stories = useAppSelector(selectStories);

  return (
    <div>
      <Stories stories={stories} />
      <Post />
    </div>
  );
};

export default PostsContainer;
