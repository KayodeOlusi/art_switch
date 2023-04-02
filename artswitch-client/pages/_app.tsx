import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import { AppPropsWithLayout } from "typings/app";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  return getLayout(
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
