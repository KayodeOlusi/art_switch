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
    <div className="bg-[#f2f5f7] h-screen">
      {verifyUser(authenticated)}
      {children}
      <Toaster />
    </div>
  );
};

export default AppLayout;
