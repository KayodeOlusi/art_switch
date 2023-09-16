import React from "react";
import "../styles/global.css";
import { store } from "app/store";
import { AxiosError, isAxiosError } from "axios";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AppPropsWithLayout } from "utils/typings/app";
import { handleAuthError } from "utils/services/client";
import ModalContainer from "@/components/global/modal";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 2,
        cacheTime: 1000 * 60 * 2,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
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
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
        <ModalContainer />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
