import Cookies from "js-cookie";
import { AxiosError } from "axios";
import HttpClient, { handleError } from "../client";
import { TResponseBody } from "../typings/posts";
import { TGetAllUserChats } from "../typings/chats";

const user_token = Cookies.get("_token") as string;

export const startChat = async (
  id: string,
  onSuccess?: () => Promise<void>,
  onError?: () => void
) => {
  try {
    await HttpClient.postWithToken(`/chat`, { userId: id }, user_token);
    onSuccess?.();
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};

export const getAllChats = async () => {
  const res = await HttpClient.getWithToken<TResponseBody<TGetAllUserChats[]>>(
    "/chat",
    user_token
  );
  return res?.data;
};
