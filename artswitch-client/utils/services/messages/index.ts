import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { TResponseBody } from "../typings/posts";
import HttpClient, { handleError } from "../client";

const user_token = Cookies.get("_token") as string;

export const getAllChatMessages = async <K>(
  id: string,
  onSuccess?: (res: K[]) => void,
  onError?: (err: AxiosError) => void
) => {
  try {
    const res = await HttpClient.getWithToken<TResponseBody<K[]>>(
      `/chat/${id}`,
      user_token
    );
    onSuccess?.(res?.data);
  } catch (error) {
    onError?.(error as AxiosError);
    handleError(error as AxiosError);
  }
};

export const sendMessageToChat = async <K>(
  { content, id }: { id: string; content: string },
  onSuccess: (res: K) => void,
  onError?: (err: AxiosError) => void
) => {
  try {
    const res = await HttpClient.postWithToken<TResponseBody<K>>(
      `/chat/${id}`,
      { content },
      user_token
    );

    onSuccess?.(res?.data);
  } catch (error) {
    onError?.(error as AxiosError);
    handleError(error as AxiosError);
  }
};
