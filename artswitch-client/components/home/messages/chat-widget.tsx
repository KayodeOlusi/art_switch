import React from "react";
import { XIcon } from "@heroicons/react/solid";
import useAppState from "utils/hooks/useAppState";
import { useMessage } from "utils/hooks/messages/useMessage";
import { TGetAllUserChats } from "utils/services/typings/chats";
import MessageScreen from "./message-screen";
import { TChatMessage } from "utils/services/typings/messages";
import { sendMessageToChat } from "utils/services/messages";

type Props = {};

const ChatWidget = (props: Props) => {
  const {
    chat: { data },
    setAppChatOpenState,
  } = useAppState();
  const chatData = React.useMemo(() => data?.chat as TGetAllUserChats, [data]);
  const { messages, loading, setMessages, error } = useMessage<TChatMessage>(
    data?.chat
  );

  const allMessages = React.useMemo(() => messages, [messages]);
  const handleSendMessage = React.useCallback(
    async (content: string, onStart?: () => void, onFinish?: () => void) => {
      onStart?.();

      await sendMessageToChat<TChatMessage>(
        { content, id: data?.chat?._id },
        res => {
          onFinish?.();
          setMessages(prev => [...prev, res]);
        },
        err => {
          onFinish?.();
          console.log(err);
        }
      );
    },
    []
  );

  return (
    <div className="p-3 h-full flex flex-col justify-between gap-y-3">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <div className="w-12 h-12">
            <img
              alt={chatData?.chat?.username}
              src={chatData?.chat?.profilePicture}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold">{chatData?.chat?.name}</p>
            <p className="text-xs">Online</p>
          </div>
        </div>
        <XIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setAppChatOpenState(false)}
        />
      </div>
      <MessageScreen
        handleSendMessage={handleSendMessage}
        messages={allMessages}
      />
    </div>
  );
};

export default ChatWidget;
