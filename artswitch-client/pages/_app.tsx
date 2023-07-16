import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import { AppPropsWithLayout } from "typings/app";
import { Provider } from "react-redux";
import { store } from "app/store";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
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
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
