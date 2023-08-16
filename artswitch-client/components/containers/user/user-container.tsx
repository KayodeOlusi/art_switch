import React from "react";
import UserPosts from "@/components/user/user-posts";
import UserStats from "@/components/user/user-stats";
import { useGetUserPosts } from "utils/hooks/posts/usePosts";
import { TUserAccountDetails } from "utils/services/typings/user";

type Props = {
  data: TUserAccountDetails;
};

const UserContainer = (props: Props) => {
  const { data: posts, isLoading, error } = useGetUserPosts(props?.data?._id);

  const allUserPosts = React.useMemo(() => {
    if (!posts) return [];
    return posts;
  }, [posts]);

  return (
    <div>
      <UserStats {...props.data} />
      <UserPosts posts={allUserPosts} error={error} loading={isLoading} />
    </div>
  );
};

export default UserContainer;
