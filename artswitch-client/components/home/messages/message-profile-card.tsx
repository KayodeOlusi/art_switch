import React from "react";
import { TGetAllUserChats } from "utils/services/typings/chats";

type Props = {
  chat: TGetAllUserChats;
  userId: string;
};

const MessageProfileCard = ({ chat, userId }: Props) => {
  return (
    <div
      className={`flex items-start space-x-4 mb-4 rounded-lg w-full
    hover:bg-gray-200 hover:bg-opacity-50 p-2 transition-all duration-200`}
    >
      <div className="">
        <div className="w-10 h-10">
          <img
            alt="image"
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
          <p className="text-[10px]">
            {new Date(chat?.updatedAt)?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
