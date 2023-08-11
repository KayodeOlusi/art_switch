import React from "react";
import Navbar from "../navbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "app/store";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
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
