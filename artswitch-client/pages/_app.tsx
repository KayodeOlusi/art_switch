import React from "react";
import "../styles/global.css";
import { store } from "app/store";
import { AxiosError, isAxiosError } from "axios";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { AppPropsWithLayout } from "utils/typings/app";
import { handleAuthError } from "utils/services/client";
import ModalContainer from "@/components/global/modal";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 2,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      onError(err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
            handleAuthError(err);
          }
        }
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {getLayout(
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
              />
            </Head>
            <NextNProgress color="#894eff" height={2} />
            <Component {...pageProps} />
            <Toaster />
            <ModalContainer />
          </>
        )}
      </Provider>
      <ReactQueryDevtools
        position="top-left"
        initialIsOpen={process.env.NODE_ENV === "development"}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
