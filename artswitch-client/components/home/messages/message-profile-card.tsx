import React from "react";
import { TGetAllUserChats } from "utils/services/typings/chats";

type Props = {
  chat: TGetAllUserChats;
};

const MessageProfileCard = ({ chat }: Props) => {
  const generateMessageTime = (date: string) => {
    return new Date(date).getTime() > Date.now() - 86400000
      ? new Date(date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  };

  return (
    <div
      className={`flex items-start space-x-4 mb-4 rounded-lg w-full
    hover:bg-gray-200 hover:bg-opacity-50 p-2 transition-all duration-200`}
    >
      <div className="">
        <div className="w-10 h-10">
          <img
            alt={`chat-image-${chat?.chat?.name}`}
            className="w-full h-full object-contain rounded-full"
            src={chat?.chat?.profilePicture || chat?.chat?.name[0]}
          />
        </div>
      </div>
      <section className="flex flex-col space-y-0 w-full">
        <div className="flex items-center justify-between gap-x-4">
          <p className="text-sm font-semibold">
            {chat?.chat?.name?.length > 12
              ? chat?.chat?.name.substring(0, 12) + "..."
              : chat?.chat?.name}
          </p>
          <p className="text-[10px]" id="chat-time">
            {generateMessageTime(chat?.updatedAt)}
          </p>
        </div>
        <p className="text-xs truncate font-normal">
          {chat?.latestMessage?.content.length > 20
            ? chat?.latestMessage?.content.substring(0, 20) + "..."
            : chat?.latestMessage?.content}
        </p>
      </section>
    </div>
  );
};

export default MessageProfileCard;
