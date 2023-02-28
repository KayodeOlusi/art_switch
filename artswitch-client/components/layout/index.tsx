import React from "react";
import { Toaster } from "react-hot-toast";
import DesktopNav from "../navbar/desktop";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const authenticated = true;

  const checkAuth = (authenticated: boolean) => {
    switch (authenticated) {
      case true:
        return <DesktopNav />;
      case false:
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f2f5f7] h-screen">
      {checkAuth(authenticated)}
      {children}
      <Toaster />
    </div>
  );
};

export default AppLayout;
