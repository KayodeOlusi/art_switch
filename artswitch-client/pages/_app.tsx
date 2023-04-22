import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import { AppPropsWithLayout } from "typings/app";
import { Provider } from "react-redux";
import { store } from "app/store";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
