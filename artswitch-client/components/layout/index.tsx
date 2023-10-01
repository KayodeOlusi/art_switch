import React from "react";
import Navbar from "../navbar";
import { store } from "app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchUserDetails } from "features/slices/user";
import ChatWidget from "../home/messages/chat-widget";
import useAppState from "utils/hooks/useAppState";
import { socket } from "../../socket";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const {
    chat: { open },
  } = useAppState();
  const user = store.getState().user.user;

  React.useEffect(() => {
    store.dispatch(fetchUserDetails());
  }, []);

  const connectSocket = React.useCallback(() => {
    socket.connect();
    socket.on("connection", () => {});
  }, [user]);

  React.useEffect(() => {
    connectSocket();

    return () => {
      socket.disconnect();
    };
  }, [connectSocket]);

  return (
    <Provider store={store}>
      <main className="bg-[#f2f5f7] h-screen overflow-y-auto">
        <Navbar />
        <div className="layout">{children}</div>
        <section
          className={`${
            open
              ? "h-screen transition-all duration-200 ease-linear sm:h-[520px] absolute"
              : "hidden"
          }
          bottom-0 right-0 md:right-1 z-50 md:rounded-tl-lg md:rounded-tr-lg w-screen md:w-[380px]
          bg-white border-gray-200 border-[1px]`}
        >
          <ChatWidget />
        </section>
        <Toaster />
      </main>
    </Provider>
  );
};

export default AppLayout;
