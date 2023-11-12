import React from "react";
import Head from "next/head";
import AppLayout from "@/components/layout";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { NextPageWithLayout } from "utils/typings/app";
import UserContainer from "@/components/containers/user/user-container";
import { useGetUserDetails } from "utils/hooks/user/useGetUserDetails";

const UserProfile: NextPageWithLayout = () => {
  const { username } = useRouter().query;
  const { data, isLoading } = useGetUserDetails(username as string);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center mt-6">
        <ClipLoader color="#000000" />
      </div>
    );

  return (
    <div>
      <Head>
        <title>ArtSwitch | User Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContainer data={data!} />
    </div>
  );
};

UserProfile.getLayout = page => <AppLayout>{page}</AppLayout>;

export default UserProfile;
