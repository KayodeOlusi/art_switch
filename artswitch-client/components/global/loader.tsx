import React from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  size: number;
  color: string;
};

const AppLoader = ({ size, color }: Props) => {
  return <PulseLoader size={size} color={color} />;
};

export default AppLoader;
