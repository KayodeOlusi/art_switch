import "../styles/global.css";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
