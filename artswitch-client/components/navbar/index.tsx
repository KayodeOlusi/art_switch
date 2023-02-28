import React from "react";
import DesktopNav from "./desktop";
import MobileNav from "./mobile";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

export default Navbar;
