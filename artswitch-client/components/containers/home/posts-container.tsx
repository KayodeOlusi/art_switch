import React from "react";
import Post from "@/components/home/posts/post";
import Stories from "@/components/home/posts/stories";

type Props = {};

const PostsContainer = (props: Props) => {
  return (
    <div>
      <Stories />
      <Post />
    </div>
  );
};

export default PostsContainer;
