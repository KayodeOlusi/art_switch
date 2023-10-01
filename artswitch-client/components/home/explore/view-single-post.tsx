import SkeletonLoader from "@/components/global/skeleton";
import { useGetSinglePost } from "utils/hooks/posts/usePosts";
import useModal from "utils/hooks/useModal";
import React from "react";
import { MODAL_VIEWS } from "utils/typings/app";
import Post from "../posts/post";

type Props = {};

const ViewSinglePost = (props: Props) => {
  const { data } = useModal();
  const { data: post, isLoading, error } = useGetSinglePost(data?._id);

  return (
    <div
      id={MODAL_VIEWS.VIEW_SINGLE_POST}
      data-testid={MODAL_VIEWS.VIEW_SINGLE_POST}
      className="w-screen h-[90vh] md:w-[580px] md:h-[460px] rounded-lg
       bg-white p-3 overflow-y-scroll no-scrollbar"
    >
      {isLoading && <SkeletonLoader />}
      {post && <Post {...post} />}
    </div>
  );
};

export default ViewSinglePost;
