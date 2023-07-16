import Cookies from "js-cookie";
import HttpClient from "../client";
import { TPostByTag } from "services/typings/posts";

const user_token = Cookies.get("_token") as string;

export const getPostsByTagSelected = async (tag: string) => {
  const res = await HttpClient.getWithToken<TPostByTag[]>(
    "/posts/explore",
    user_token,
    { tag }
  );

  return res;
};
