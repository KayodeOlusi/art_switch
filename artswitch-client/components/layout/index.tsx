import React from "react";
import Navbar from "../navbar";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <main className="bg-[#f2f5f7] h-screen overflow-y-auto">
      <Navbar />
      <div className="layout">{children}</div>
      <Toaster />
    </main>
  );
};

export default AppLayout;
