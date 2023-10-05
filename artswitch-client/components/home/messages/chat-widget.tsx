import React from "react";
import { socket } from "../../../socket";
import { XIcon } from "@heroicons/react/solid";
import MessageScreen from "./message-screen";
import useAppState from "utils/hooks/useAppState";
import { selectUserDetails, setNotifications } from "features/slices/user";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useMessage } from "utils/hooks/messages/useMessage";
import { TGetAllUserChats } from "utils/services/typings/chats";
import { TChatMessage, TSingleMessage } from "utils/services/typings/messages";
import { getChatData } from "utils/functions";

type Props = {};

const ChatWidget = (props: Props) => {
  const {
    chat: { data },
    setAppChatOpenState,
  } = useAppState();
  const dispatch = useAppDispatch();
  const { user, notifications } = useAppSelector(selectUserDetails);
  const chatData = React.useMemo(() => data as TGetAllUserChats, [data]);
  const { messages, loading, setMessages, error } =
    useMessage<TChatMessage>(chatData);

  const messageData = React.useMemo(
    () => ({
      error,
      loading,
      messages,
    }),
    [messages, loading, error, setMessages]
  );

  const compareChatAndSendMessage = (message: any) => {
    if (!data || data?.chat?._id !== message?.chat?.chat) {
      const notification = message as TSingleMessage;

      if (!notifications.includes(notification)) {
        dispatch(setNotifications(notification));
      }
    } else {
      const newMessage = message as TChatMessage;
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleSendMessage = React.useCallback(
    async (
      content: string,
      { onStart, onFinish }: { onStart?: () => void; onFinish?: () => void }
    ) => {
      socket.emit("new message", {
        content,
        id: chatData?._id,
        userId: user?._id,
      });
    },
    [data]
  );

  React.useEffect(() => {
    socket.emit("chatroom", user);
  }, []);

  React.useEffect(() => {
    socket.on(`message received ${data?._id}`, message => {
      compareChatAndSendMessage(message);
    });

    return () => {
      socket.off(`message received ${data?._id}`);
    };
  });

  const currentUser = React.useMemo(() => user?._id, [chatData, user]);

  const formatChatName = (name: string = "") => {
    return name.length > 15 ? name.substring(0, 12) + "..." : name;
  };

  const getChatName = () => {
    let name = "";

    if (chatData?.chat?.name === user?.name) {
      name = chatData.users?.find(u => u?.name !== user?.name)?.name || "";
    } else {
      name = chatData?.chat?.name;
    }

    return formatChatName(name);
  };

  return (
    <div className="p-3 h-full flex flex-col justify-between gap-y-3">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <div className="w-12 h-12">
            <img
              alt={chatData?.chat?.username}
              src={
                getChatData(user?._id, chatData?.users, "_id")?.profilePicture
              }
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold">
              {getChatData(user?._id, chatData?.users, "_id")?.name}
            </p>
            <p className="text-xs">Online</p>
          </div>
        </div>
        {/**TODO: Refetch chats when user closes the chat widget */}
        <XIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setAppChatOpenState(false)}
        />
      </div>
      <MessageScreen
        user={currentUser}
        messageData={messageData}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatWidget;