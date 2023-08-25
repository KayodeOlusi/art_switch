import React from "react";
import {
  ChatIcon,
  HeartIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { TPost } from "utils/services/typings/posts";

type Props = TPost;

const Post = (props: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-3 space-y-5">
      <div className="flex items-center justify-between">
        <section className="flex items-center space-x-2">
          <div>
            {props?.user?.profilePicture && (
              <img
                alt="Avatar"
                src={props?.user?.profilePicture}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => router.push(`/user/${props?.user?.username}`)}
              />
            )}
          </div>
          <section>
            <h4 className="font-semibold">{props?.user?.name}</h4>
            <p className="font-medium text-sm">@{props?.user?.username}</p>
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
      {props?.image && (
        <div className="w-full flex gap-x-4">
          <HeartIcon className="w-7 h-7" />
          <ChatIcon className="w-7 h-7" />
        </div>
      )}
      <div>
        <p className="text-sm">
          <span className="font-semibold">{props?.user?.username}</span>{" "}
          {props?.caption} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Cumque esse nihil ipsam nulla. Consequuntur aliquam voluptate
          unde eaque sint neque, quia magni eos. Eveniet vero eum, ex veniam id
          mollitia.
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
      {!props?.image && (
        <div className="w-full flex gap-x-4">
          <HeartIcon className="w-7 h-7" />
          <ChatIcon className="w-7 h-7" />
        </div>
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
