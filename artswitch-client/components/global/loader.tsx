import React from "react";
import { ClipLoader, PulseLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/helpers/props";

interface Props extends LoaderSizeProps {
  size: number;
  color: string;
}

export const SpinnerLoader = ({ size, color, ...props }: Props) => (
  <ClipLoader size={size} color={color} {...props} />
);

const AppLoader = ({ size, color, ...props }: Props) => {
  return <PulseLoader size={size} color={color} {...props} />;
};

export default AppLoader;
