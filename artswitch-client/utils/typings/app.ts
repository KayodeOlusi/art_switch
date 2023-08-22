import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export enum MODAL_VIEWS {
  UPLOAD_POST = "UPLOAD_POST",
  VIEW_ARTIST_PROFILE = "VIEW_ARTIST_PROFILE",
  CREATE_CHAT_WITH_ARTIST = "CREATE_CHAT_WITH_ARTIST",
  VIEW_SINGLE_POST = "VIEW_SINGLE_POST",
  NONE = "NONE",
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
