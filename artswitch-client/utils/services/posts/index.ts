import {
  TPost,
  TAllPostsByTag,
  TResponseBody,
  TCreatePostBody,
  TGetCommentsForPost,
} from "utils/services/typings/posts";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import HttpClient, { handleError } from "../client";

const user_token = Cookies.get("_token") as string;

export const getAllPostsForUser = async (id: string) => {
  const res = await HttpClient.getWithToken<TResponseBody<TPost[]>>(
    `/posts/user/${id}`,
    user_token
  );

  return res?.data;
};

export const getSinglePost = async (postId: string) => {
  const res = await HttpClient.getWithToken<TResponseBody<TPost>>(
    `/posts/${postId}`,
    user_token
  );

  return res?.data;
};

export const getFeedPosts = async () => {
  const res = await HttpClient.getWithToken<TResponseBody<TPost[]>>(
    "/posts",
    user_token
  );

  return res?.data;
};

const addPost = async (
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

export const UploadImage = async (
  callback: (res: Record<string, any>) => Promise<void>,
  paramsToPost: { file: string },
  onError?: () => void
) => {
  fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify(paramsToPost),
  })
    .then(res => res.json())
    .then(({ res }) => callback(res))
    .catch(() => onError?.());
};

export const uploadImageToCloudinary = async (
  file: string,
  onSuccess: (res: any) => Promise<void>,
  onError: () => void
) => {
  try {
    await UploadImage(res => onSuccess(res), { file }, onError);
  } catch (error) {
    onError();
  }
};

export const getPostsByTagSelected = async (tag: string) => {
  const res = await HttpClient.getWithToken<TAllPostsByTag>(
    "/posts/explore",
    user_token,
    { tag }
  );

  return res;
};

export const createPost = async (
  data: TCreatePostBody,
  onSuccess?: () => void,
  onError?: () => void
) => {
  try {
    data?.image
      ? await UploadImage(
          async res =>
            await addPost(
              { ...data, image: res?.secure_url },
              onSuccess,
              onError
            ),
          { file: data?.image },
          () => onError?.()
        )
      : await addPost(data, onSuccess, onError);
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};

export const getCommentForPost = async (id: string) => {
  const res = await HttpClient.getWithToken<
    TResponseBody<TGetCommentsForPost[]>
  >(`/posts/comments/${id}`, user_token);

  return res?.data;
};

export const addCommentToPost = async (
  id: string,
  data: {
    comment: string;
    user: string;
  },
  onSuccess: () => Promise<void>,
  onError?: () => void
) => {
  try {
    await HttpClient.postWithToken(`/posts/comments/${id}`, data, user_token);

    onSuccess();
  } catch (error) {
    onError?.();
    handleError(error as AxiosError);
  }
};

export const likeOrUnlikePost = async (
  action: "like" | "unlike",
  id: string,
  onSuccess?: (res: TPost["likes"]) => void,
  onError?: () => void
) => {
  try {
    const res = await HttpClient.patchWithToken<TResponseBody<TPost>>(
      `/posts/${id}`,
      {},
      user_token,
      {
        action,
      }
    );

    onSuccess?.(res?.data?.likes);
  } catch (error) {}
};
