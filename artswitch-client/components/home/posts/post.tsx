import React from "react";
import { TPost } from "services/typings/posts";
import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/outline";

type Props = TPost;

const Post = (props: Props) => {
  return (
    <div className="bg-white rounded-lg p-3 space-y-5">
      <div className="flex items-center justify-between">
        <section className="flex items-center space-x-2">
          <div>
            {props?.image && (
              <img
                alt="Avatar"
                src={props?.image}
                className="w-10 h-10 rounded-full"
              />
            )}
            <p className="font-semibold text-sm">{props?.id}</p>
          </div>
          <section>
            <h4>{props.caption}</h4>
            <p>{props.userId}</p>
          </section>
        </section>
        <DotsHorizontalIcon className="w-6 h-6" />
      </div>
      {props?.image && (
        <div className="w-full h-80 rounded-lg">
          <img
            alt="Post"
            src={props?.image}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <div>
        <span className="text-sm font-semibold">username</span> {props?.caption}
      </div>
      <div className="w-full flex gap-x-4">
        <HeartIcon className="w-7 h-7" />
        <ChatIcon className="w-7 h-7" />
      </div>
      {props.likes.length > 0 && (
        <div>
          <p>{props.likes.length} likes</p>
        </div>
      )}
    </div>
  );
};

export default Post;
