import React, { forwardRef } from "react";
import { CommentHandler } from "./post";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useAppSelector } from "app/hooks";
import { SpinnerLoader } from "@/components/global/loader";
import { selectUserDetails } from "features/slices/user";
import { addCommentToPost } from "utils/services/posts";
import { successMessage } from "utils/services/client";
import { TGetCommentsForPost } from "utils/services/typings/posts";
import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/solid";

type TComment = {
  time: string;
  image: string;
  comment: string;
  username: string;
};

type Props = Omit<
  CommentHandler,
  "allLikes" | "hasLikedPost" | "likePost" | "setHasLikedPost"
> & {
  id: string;
  error: any;
  isLoading: boolean;
  comments: TGetCommentsForPost[];
  innerRef: React.RefObject<HTMLDivElement>;
  setShowCommentSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const Comment = (props: TComment) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col space-y-1 cursor-pointer"
      onClick={() => router.push(`/user/${props?.username}`)}
    >
      <p className="font-bold text-xs">
        {props?.username}
        <span className="text-[10px] font-normal ml-2">
          @ {new Date(props?.time).toLocaleString()}
        </span>
      </p>
      <div>
        <p className="text-xs">{props?.comment}</p>
      </div>
    </div>
  );
};

const CommentSection = ({
  id,
  error,
  comments,
  innerRef,
  isLoading,
  setShowCommentSection,
}: Props) => {
  const {
    user: { _id },
  } = useAppSelector(selectUserDetails);
  const queryClient = useQueryClient();
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const data = {
      comment: comment.trim(),
      user: _id,
    };
    e.preventDefault();

    await addCommentToPost(
      id,
      data,
      async () => {
        setLoading(false);
        await queryClient.refetchQueries(["comments", id]);
        setComment("");
        return successMessage("Comment added successfully!");
      },
      () => setLoading(false)
    );
  };

  return (
    <div
      ref={innerRef}
      data-testid="comment-section"
      className="border-2 rounded-lg border-gray-100 p-3"
    >
      <div>
        <ChevronLeftIcon
          className="w-5 h-5 cursor-pointer mb-1"
          onClick={() => setShowCommentSection(false)}
        />
      </div>
      <div
        className="border-2 rounded-lg border-gray-100 
        p-2 h-28 overflow-y-scroll scrollbar-none"
      >
        {isLoading && !error ? (
          <div className="w-full h-full flex items-center justify-center">
            <SpinnerLoader size={20} color="#7C3AED" />
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col space-y-3">
            {comments.map(comment => (
              <Comment
                key={comment._id}
                comment={comment.comment}
                time={comment.createdAt}
                username={comment.user.username}
                image={comment.user.profilePicture}
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-xs text-center">
            An error occurred while fetching comments. Please try again later.
          </p>
        ) : (
          <p className="text-xs text-center">
            No comments yet. Be the first to comment on this post and start a
            conversation!
          </p>
        )}
      </div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            name="comment"
            value={comment}
            placeholder="Add a comment..."
            onChange={e => setComment(e.target.value)}
            className="w-full rounded-lg pr-8 pl-4 py-1 text-xs outline-none"
          />
          <button type="submit" disabled={loading || comment.length <= 3}>
            {loading ? (
              <SpinnerLoader
                size={16}
                color="#7C3AED"
                className="w-4 h-4 rotate-90 absolute right-3
                  top-[6px] hover:text-purple-400 cursor-pointer
                  transition-all duration-200"
              />
            ) : (
              <PaperAirplaneIcon
                className="w-4 h-4 rotate-90 absolute right-3
                  top-[6px] hover:text-purple-400 cursor-pointer
                  transition-all duration-200
                "
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
