import "../styles/global.css";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "app/store";
import { AppPropsWithLayout } from "utils/typings/app";
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
