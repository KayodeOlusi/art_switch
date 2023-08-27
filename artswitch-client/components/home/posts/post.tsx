import React from "react";
import {
  ChatIcon,
  HeartIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import CommentSection from "./comment-section";
import { TPost } from "utils/services/typings/posts";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

type Props = TPost;

export type CommentHandler = {
  hasLikedPost: boolean;
  setHasLikedPost: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCommentSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostInteractions = ({
  hasLikedPost,
  setHasLikedPost,
  setShowCommentSection,
}: CommentHandler) => {
  return (
    <div className="w-full flex gap-x-4">
      {hasLikedPost ? (
        <HeartIconFilled className="text-red-500 w-7 h-7 cursor-pointer" />
      ) : (
        <HeartIcon className="w-7 h-7 cursor-pointer" />
      )}
      <ChatIcon
        className="w-7 h-7 cursor-pointer"
        onClick={() => setShowCommentSection(true)}
      />
    </div>
  );
};

const Post = (props: Props) => {
  const router = useRouter();
  const [hasLikedPost, setHasLikedPost] = React.useState(false);
  const [showCommentSection, setShowCommentSection] = React.useState(false);

  const likePost = React.useCallback(() => {}, []);

  const handlePostInteraction = React.useMemo(
    () => ({
      hasLikedPost,
      setHasLikedPost,
      setShowCommentSection,
    }),
    []
  );

  return (
    <div className="bg-white rounded-lg p-3 space-y-5">
      <div className="flex items-center justify-between">
        <section className="flex items-center space-x-2">
          <div>
            <img
              alt="Profile Picture"
              src={props?.user?.profilePicture}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => router.push(`/user/${props?.user?.username}`)}
            />
          </div>
          <section id="user-details">
            <h4 className="font-semibold">{props?.user?.name}</h4>
            <p className="font-medium text-sm">@{props?.user?.username}</p>
          </section>
        </section>
        <DotsHorizontalIcon className="w-6 h-6" />
      </div>
      {props?.image && (
        <div className="w-full h-80 rounded-lg">
          <img
            alt="Post Image"
            src={props?.image}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      {props?.image && <PostInteractions {...handlePostInteraction} />}
      <div>
        <p className="text-sm">
          <span className="font-semibold">{props?.user?.username}</span>{" "}
          {props?.caption}
        </p>
        <p className="text-xs opacity-30 mt-1">
          {new Date(props?.createdAt).toLocaleString()}
        </p>
        <div className="flex gap-x-2 mt-3">
          {props?.tags?.map(tag => (
            <p
              key={tag}
              className="capitalize bg-gray-200 px-2 py-1 rounded-lg text-[10px] w-fit"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      {showCommentSection ? (
        <CommentSection {...handlePostInteraction} id={props?._id} />
      ) : (
        !props?.image && <PostInteractions {...handlePostInteraction} />
      )}
      {props?.likes?.length > 0 && (
        <div>
          <p>{props.likes.length} likes</p>
        </div>
      )}
    </div>
  );
};

export default Post;
