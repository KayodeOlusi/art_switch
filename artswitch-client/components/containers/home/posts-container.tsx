import React from "react";
import Post from "@/components/home/posts/post";
import Stories from "@/components/home/posts/stories";
import { useAppSelector } from "../../../app/hooks";
import { selectStories } from "../../../features/slices/stories";

const PostsContainer = () => {
  const stories = useAppSelector(selectStories);

  const post = {
    profileURL: "",
    name: "Ashanti",
    location: "Nigeria",
    postDetails: "lorem",
  };

  return (
    <div className="space-y-4">
      <Stories stories={stories} />
      <Post {...post} />
    </div>
  );
};

export default PostsContainer;
