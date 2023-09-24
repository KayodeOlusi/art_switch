import React from "react";
import { useAppSelector } from "app/hooks";
import { selectUserDetails } from "features/slices/user";
import { TGetAllUserChats } from "utils/services/typings/chats";

type Props = {
  chat: TGetAllUserChats;
  onClick: () => void;
};

const MessageProfileCard = ({ chat, onClick }: Props) => {
  const { user } = useAppSelector(selectUserDetails);

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
      onClick={onClick}
      id="chat-card"
      className={`flex cursor-pointer items-start space-x-4 mb-4 rounded-lg w-full
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
            {chat?.chat?.name === user?.name
              ? chat.users?.find(u => u?.name !== user?.name)?.name
              : chat?.chat?.name}
          </p>
          <p className="text-[10px]" id="chat-time">
            {generateMessageTime(chat?.updatedAt)}
          </p>
        </div>
        <p className="text-xs truncate font-normal" id="chat-message">
          {chat?.latestMessage?.content.length > 20
            ? chat?.latestMessage?.content.substring(0, 20) + "..."
            : chat?.latestMessage?.content}
        </p>
      </section>
    </div>
  );
};

export default MessageProfileCard;
