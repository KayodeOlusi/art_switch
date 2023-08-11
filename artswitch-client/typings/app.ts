import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export enum MODAL_VIEWS {
  UPLOAD_POST = "UPLOAD_POST",
  SEARCH_FOR_ARTIST = "SEARCH_FOR_ARTIST",
  NONE = "NONE",
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
