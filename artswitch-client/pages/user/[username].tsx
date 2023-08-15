import React from "react";
import { AxiosError } from "axios";
import AppLayout from "@/components/layout";
import { getUserDetails } from "services/user";
import { NextPageWithLayout } from "typings/app";
import { generateAPIError } from "utils/functions";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = {
  data: any;
  err: AxiosError | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  try {
    const userToken = context.req.cookies["_token"] as string;
    const username = context.params?.username as string;

    const data = await getUserDetails(userToken, username);

    return {
      props: {
        data,
        err: null,
      },
    };
  } catch (error) {
    const err = error as AxiosError;
    return generateAPIError(err?.response?.status as number, err);
  }
};

const UserProfile: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, err }) => {
  return <div>UserProfile</div>;
};

UserProfile.getLayout = page => <AppLayout>{page}</AppLayout>;

export default UserProfile;
