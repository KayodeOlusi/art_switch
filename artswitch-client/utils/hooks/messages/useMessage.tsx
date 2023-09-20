import React from "react";
import useAppState from "../useAppState";
import { getAllChatMessages } from "utils/services/messages";
import { TGetAllUserChats } from "utils/services/typings/chats";

export const useMessage = <T,>(data: TGetAllUserChats) => {
  const {
    chat: { open },
  } = useAppState();
  const [messages, setMessages] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchMessages = React.useCallback(async () => {
    setLoading(prev => !prev);

    await getAllChatMessages<T>(
      data?._id,
      res => {
        setLoading(prev => !prev);
        setMessages(res);
      },
      err => {
        setLoading(prev => !prev);
        setError(err);
      }
    );
  }, [data]);

  React.useEffect(() => {
    open && fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, setMessages };
};
