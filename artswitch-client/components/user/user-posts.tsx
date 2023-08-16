import React from "react";
import { AxiosError } from "axios";
import { TPost } from "utils/services/typings/posts";

type Props = {
  posts: TPost[];
  loading: boolean;
  error: AxiosError | unknown;
};

const UserPosts = ({ error, loading, posts }: Props) => {
  return <div></div>;
};

export default UserPosts;
