import SkeletonLoader from "@/components/global/skeleton";
import { useGetSinglePost } from "hooks/posts/usePosts";
import useModal from "hooks/useModal";
import React from "react";
import { MODAL_VIEWS } from "typings/app";
import Post from "../posts/post";

type Props = {};

const ViewSinglePost = (props: Props) => {
  const { data } = useModal();
  const { data: post, isLoading, error } = useGetSinglePost(data?._id);

  return (
    <div
      id={MODAL_VIEWS.VIEW_SINGLE_POST}
      data-testid={MODAL_VIEWS.VIEW_SINGLE_POST}
      className="w-[580px] h-[460px] rounded-lg bg-white p-3 overflow-y-scroll no-scrollbar"
    >
      {isLoading && <SkeletonLoader />}
      {post && <Post {...post} />}
    </div>
  );
};

export default ViewSinglePost;
