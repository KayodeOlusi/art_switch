import { NextPage } from "next";
import Image from "next/image";
import LoginImage from "../../../public/assets/bg.png";
import Button from "../../../components/auth/button";

type Props = {};

const Login: NextPage = (props: Props) => {
  return (
    <div className="grid grid-cols-2 h-screen font-Inter">
      <section className="form-section block p-4 col-span-2 lg:col-span-1">
        <div className="logo font-semibold">ArtSwitch</div>
        <div className="login-form h-5/6 flex flex-col items-center justify-center">
          <p className="font-semibold text-4xl mb-4">Welcome Back</p>
          <form className="flex flex-col" onSubmit={() => {}}>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 border-gray-800 w-80 px-4 py-3 text-black rounded-md mb-6"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-gray-800 w-80 px-4 py-3 text-black rounded-md mb-6"
            />
            <section className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-sm font-semibold">
                Remember Me
              </label>
            </section>
            <Button />
          </form>
          <p className="text-sm font-semibold">
            Don't have an account?{" "}
            <span className="underline cursor-pointer">Sign Up</span>
          </p>
        </div>
      </section>
      <section className="hidden lg:block bg-[url('/assets/images/bg.png')] bg-no-repeat bg-center object-cover w-full h-full" />
    </div>
  );
};

export default Login;
