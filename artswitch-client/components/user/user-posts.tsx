import React from "react";
import { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";
import useModal from "utils/hooks/useModal";
import { TPost } from "utils/services/typings/posts";
import { MODAL_VIEWS } from "utils/typings/app";

type Props = {
  posts: TPost[];
  loading: boolean;
  error: AxiosError | unknown;
};

type SingleUserPostProps = {
  post: TPost;
};

export const SingleUserPost = ({ post }: SingleUserPostProps) => {
  const { openModal, setModalViewData } = useModal();

  const openPostModal = (post: TPost) => {
    setModalViewData(post);
    openModal(MODAL_VIEWS.VIEW_SINGLE_POST);
  };

  return (
    <div
      key={post._id}
      onClick={() => openPostModal(post)}
      className={`w-full cursor-pointer h-44 object-cover rounded-lg ${
        !post?.image ? "p-4 shadow-sm" : "shadow-md"
      }`}
    >
      {post?.image ? (
        <img
          alt="image"
          src={post.image}
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <div className="space-y-4 overflow-y-scroll h-full no-scrollbar">
          <div>
            <p className="text-sm font-semibold">Caption</p>
            <p className="text-xs">{post.caption.substring(0, 30)}...</p>
          </div>
          <div className="">
            <p className="text-sm font-semibold">Tags</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {post?.tags?.map(tag => (
                <p className="bg-gray-300 font-light text-xs p-2 rounded-md text-white">
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserPosts = ({ error, loading, posts }: Props) => {
  return (
    <div className="mx-6 mt-12">
      <h2 className="text-xl font-semibold uppercase">Posts</h2>
      <div className="flex items-center justify-center mt-6">
        {loading && <ClipLoader size={40} color="#000000" className="mt-9" />}
        {(error as AxiosError) && (
          <p className="mt-9 font-medium">
            An error occurred while fetching posts. Please try again later.
          </p>
        )}
        <div className="grid gap-4 lg:grid-cols-3">
          {!loading && !error && posts.length > 0 ? (
            posts?.map(post => <SingleUserPost post={post} key={post._id} />)
          ) : !loading && !error && posts.length === 0 ? (
            <p className="mt-9 font-medium">No posts found.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
