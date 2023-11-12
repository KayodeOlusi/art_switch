import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { UploadImage } from "../posts";
import HttpClient, { handleError } from "../client";
import { TResponseBody } from "utils/services/typings/posts";
import { FollowOperationData } from "@/components/user/user-stats";
import { TSearchUser, TUserAccountDetails } from "utils/services/typings/user";

const user_token = Cookies.get("_token") as string;

export const followOperation = async (
  data: FollowOperationData,
  onSuccess: () => Promise<void>
) => {
  try {
    await HttpClient.postWithToken("/user/action", data, user_token);
    await onSuccess();
  } catch (error) {}
};

export const getSuggestionsForUser = async () => {
  const res = await HttpClient.getWithToken<TResponseBody<TSuggestion[]>>(
    "/user/suggestions",
    user_token
  );

  return res.data;
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

const editUserProfileImage = async (
  data: { image: string },
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    await HttpClient.patchWithToken<TResponseBody<Record<string, string>>>(
      "/user/profile",
      data,
      user_token
    );

    onSuccess?.();
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};

export const editProfilePicture = async (
  file: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    await UploadImage(
      async res =>
        await editUserProfileImage(
          { image: res?.secure_url },
          onSuccess,
          onError
        ),
      { file },
      onError
    );
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};
