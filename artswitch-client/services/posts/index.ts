import Cookies from "js-cookie";
import { AxiosError } from "axios";
import HttpClient, { handleError } from "../client";
import {
  TAllPostsByTag,
  TCreatePostBody,
  TPostByTag,
} from "services/typings/posts";

const user_token = Cookies.get("_token") as string;

export const getPostsByTagSelected = async (tag: string) => {
  const res = await HttpClient.getWithToken<TAllPostsByTag<TPostByTag>>(
    "/posts/explore",
    user_token,
    { tag }
  );

  return res?.data;
};

export const createPost = async (
  data: TCreatePostBody,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    await HttpClient.postWithToken("/posts", data, user_token);
    onSuccess?.();
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};
