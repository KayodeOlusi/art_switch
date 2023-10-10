import Cookies from "js-cookie";
import { AxiosError } from "axios";
import HttpClient, { handleError } from "../client";
import { TResponseBody } from "utils/services/typings/posts";
import { TSearchUser, TUserAccountDetails } from "utils/services/typings/user";
import { FollowOperationData } from "@/components/user/user-stats";

const user_token = Cookies.get("_token") as string;

export const followOperation = async (
  data: FollowOperationData,
  onSuccess: () => void
) => {
  try {
    await HttpClient.postWithToken("/user/action", data, user_token);
    onSuccess();
  } catch (error) {}
};

export const getUserDetails = async (username: string) => {
  const res = await HttpClient.getWithToken<TResponseBody<TUserAccountDetails>>(
    "/user/details",
    user_token,
    { username }
  );

  return res.data;
};

export const searchArtist = async (
  artist: string,
  onSuccess: (res: TSearchUser["data"]) => void,
  onError: () => void
) => {
  try {
    const res = await HttpClient.getWithToken<TSearchUser>(
      "/user",
      user_token,
      { artist }
    );

    onSuccess(res.data);
  } catch (error) {
    onError();
    handleError(error as AxiosError);
  }
};
