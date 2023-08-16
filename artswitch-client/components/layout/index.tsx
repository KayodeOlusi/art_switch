import React from "react";
import Navbar from "../navbar";
import { store } from "app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchUserDetails } from "features/slices/user";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  React.useEffect(() => {
    store.dispatch(fetchUserDetails());
  }, []);

  return (
    <Provider store={store}>
      <main className="bg-[#f2f5f7] h-screen overflow-y-auto">
        <Navbar />
        <div className="layout">{children}</div>
        <Toaster />
      </main>
    </Provider>
  );
};

export default AppLayout;
