import React from "react";
import { ClipLoader, PulseLoader } from "react-spinners";

type Props = {
  size: number;
  color: string;
};

export const SpinnerLoader = ({ size, color }: Props) => (
  <ClipLoader size={size} color={color} />
);

const AppLoader = ({ size, color }: Props) => {
  return <PulseLoader size={size} color={color} />;
};

export default AppLoader;
