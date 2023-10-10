import React from "react";
import AppLayout from "@/components/layout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "utils/typings/app";
import UserContainer from "@/components/containers/user/user-container";
import { useGetUserDetails } from "utils/hooks/user/useGetUserDetails";

const UserProfile: NextPageWithLayout = () => {
  const { username } = useRouter().query;
  const { data, isLoading } = useGetUserDetails(username as string);

  if (isLoading) return <div>Loading...</div>;

  return <UserContainer data={data!} />;
};

UserProfile.getLayout = page => <AppLayout>{page}</AppLayout>;

export default UserProfile;
