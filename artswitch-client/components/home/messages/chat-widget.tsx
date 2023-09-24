import React from "react";
import { socket } from "../../../socket";
import { useAppSelector } from "app/hooks";
import { XIcon } from "@heroicons/react/solid";
import MessageScreen from "./message-screen";
import useAppState from "utils/hooks/useAppState";
import { useMessage } from "utils/hooks/messages/useMessage";
import { TGetAllUserChats } from "utils/services/typings/chats";
import { TChatMessage } from "utils/services/typings/messages";
import { sendMessageToChat } from "utils/services/messages";
import { selectUserDetails } from "features/slices/user";

type Props = {};

const ChatWidget = (props: Props) => {
  const {
    chat: { data },
    setAppChatOpenState,
  } = useAppState();

  const { user } = useAppSelector(selectUserDetails);
  const [socketConnected, setSocketConnected] = React.useState(false);
  const chatData = React.useMemo(() => data as TGetAllUserChats, [data]);
  const { messages, loading, setMessages, error, selectedChatCompare } =
    useMessage<TChatMessage>(chatData);

  const compareChatAndSendMessage = (message: TChatMessage) => {};

  const handleSendMessage = React.useCallback(
    async (
      content: string,
      { onStart, onFinish }: { onStart?: () => void; onFinish?: () => void }
    ) => {
      onStart?.();

      await sendMessageToChat<TChatMessage>(
        { content, id: chatData?._id },
        res => {
          onFinish?.();

          console.log(res);
          socket.emit("new message", res);
          setMessages([...messages, res]);
        },
        err => {
          onFinish?.();
          console.log(err);
        }
      );
    },
    [data]
  );

  React.useEffect(() => {
    socket.connect();
    socket.emit("chatroom", user);
    socket.on("connection", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  React.useEffect(() => {
    socket.on("new message", message => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?.chat?._id !== message?.chat?.chat
      ) {
        // send notification
      } else {
        setMessages([...messages, message]);
      }
    });
  });

  const currentUser = React.useMemo(() => user?._id, [chatData, user]);
  const messageData = React.useMemo(
    () => ({
      error,
      loading,
      messages,
    }),
    [messages, loading, error, setMessages]
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
