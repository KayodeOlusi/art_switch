import { useQuery } from "react-query";
import { getAllChats } from "utils/services/chat";
import { TGetAllUserChats } from "utils/services/typings/chats";
import { TResponseBody } from "utils/services/typings/posts";

export const useGetChats = (id: string) => {
  return useQuery<TResponseBody<TGetAllUserChats[]>["data"], any>(
    [`chats-${id}`],
    getAllChats,
    {
      enabled: !!id,
    }
  );
};
