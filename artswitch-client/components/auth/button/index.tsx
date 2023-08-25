import { SpinnerLoader } from "@/components/global/loader";
import { FC } from "react";

type Props = {
  type: "login" | "signup";
  loading: boolean;
};

const Button: FC<Props> = ({ type, loading }) => {
  return (
    <button
      type="submit"
      className="bg-black w-80 font-semibold text-sm px-4 py-3 rounded-md text-white mb-6"
    >
      {loading ? (
        <SpinnerLoader role="progressbar" size={20} color="#FFFFFF" />
      ) : type === "login" ? (
        "Login"
      ) : (
        "Sign Up"
      )}
    </button>
  );
};

export default Button;
