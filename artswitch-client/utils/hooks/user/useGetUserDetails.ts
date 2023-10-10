import { useQuery } from "react-query";
import { TUserAccountDetails } from "utils/services/typings/user";
import { getUserDetails } from "utils/services/user";

export const useGetUserDetails = (username: string) => {
  return useQuery<TUserAccountDetails, any>(
    [`user-${username}`, username],
    () => getUserDetails(username)
  );
};
