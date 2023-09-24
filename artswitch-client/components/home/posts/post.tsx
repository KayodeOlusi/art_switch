import React from "react";
import {
  ChatIcon,
  HeartIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useAppSelector } from "app/hooks";
import CommentSection from "./comment-section";
import { TPost } from "utils/services/typings/posts";
import { selectUserDetails } from "features/slices/user";
import { likeOrUnlikePost } from "utils/services/posts";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useGetCommentsForPost } from "utils/hooks/posts/usePosts";

type Props = TPost;

export type CommentHandler = {
  allLikes: string[];
  hasLikedPost: boolean;
  likeAndUnlikePost: () => Promise<void>;
  commentRef: React.RefObject<HTMLDivElement>;
  setHasLikedPost: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCommentSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostInteractions = ({
  allLikes,
  commentRef,
  hasLikedPost,
  setHasLikedPost,
  likeAndUnlikePost,
  setShowCommentSection,
}: CommentHandler) => {
  return (
    <div>
      {allLikes?.length > 0 && (
        <div className="px-1">
          <p className="text-xs" id="likes-num">
            <span className="font-bold">{allLikes?.length}</span>{" "}
            {allLikes?.length > 1 ? "likes" : "like"}
          </p>
        </div>
      )}
      <div className="w-full flex gap-x-4">
        {hasLikedPost ? (
          <HeartIconFilled
            id="like-icon"
            className="text-[#894eff] w-6 h-6 cursor-pointer"
            onClick={async () => {
              setHasLikedPost(prev => !prev);
              await likeAndUnlikePost();
            }}
          />
        ) : (
          <HeartIcon
            id="unlike-icon"
            className="w-6 h-6 cursor-pointer"
            onClick={async () => {
              setHasLikedPost(prev => !prev);
              await likeAndUnlikePost();
            }}
          />
        )}
        <ChatIcon
          id="comment-icon"
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            setShowCommentSection(true);
            setTimeout(() => {
              commentRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 500);
          }}
        />
      </div>
    </div>
  );
};

const Post = (props: Props) => {
  const router = useRouter();
  const commentRef = React.useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(selectUserDetails);
  const [allLikes, setAllLikes] = React.useState(props?.likes);
  const [showCommentSection, setShowCommentSection] = React.useState(false);
  const [hasLikedPost, setHasLikedPost] = React.useState(
    allLikes?.includes(user?._id)
  );
  const {
    error,
    isLoading,
    data: comments,
  } = useGetCommentsForPost(props?._id, showCommentSection);

  const allComments = React.useMemo(() => {
    if (!comments) return [];
    return comments;
  }, [comments]);

  const likeAndUnlikePost = React.useCallback(async () => {
    switch (hasLikedPost) {
      case true:
        await likeOrUnlikePost("unlike", props?._id, res => {
          setAllLikes(res);
        });
        break;
      case false:
        await likeOrUnlikePost("like", props?._id, res => {
          setAllLikes(res);
        });
      default:
        break;
    }
  }, [hasLikedPost]);

  const handlePostInteraction = React.useMemo(
    () => ({
      allLikes,
      commentRef,
      hasLikedPost,
      setHasLikedPost,
      likeAndUnlikePost,
      setShowCommentSection,
    }),
    [showCommentSection, hasLikedPost, allLikes, commentRef]
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
        <CommentSection
          error={error}
          id={props?._id}
          innerRef={commentRef}
          comments={allComments}
          isLoading={isLoading}
          {...handlePostInteraction}
        />
      ) : (
        !props?.image && <PostInteractions {...handlePostInteraction} />
      )}
    </div>
  );
};

export default Post;
