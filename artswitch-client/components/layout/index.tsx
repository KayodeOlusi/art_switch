import React from "react";
import Navbar from "../navbar";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const authenticated = true;

  const verifyUser = (authenticated: boolean) => {
    switch (authenticated) {
      case true:
        return <Navbar />;
      case false:
        return null;
      default:
        return null;
    }
  };

  return (
    <main className="bg-[#f2f5f7] h-screen">
      {verifyUser(authenticated)}
      <div className="layout">{children}</div>
      <Toaster />
    </main>
  );
};

export default AppLayout;
