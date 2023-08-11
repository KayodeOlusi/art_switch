import Cookies from "js-cookie";
import { AxiosError } from "axios";
import HttpClient, { handleError } from "../client";
import { TSearchUser } from "services/typings/user";

const user_token = Cookies.get("_token") as string;

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
