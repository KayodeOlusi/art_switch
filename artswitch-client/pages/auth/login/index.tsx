import Link from "next/link";
import { NextPage } from "next";
import LoginForm from "../../../components/auth/login/login-form";

const Login: NextPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen font-Inter">
      <section className="form-section block p-4 col-span-2 lg:col-span-1 lg:border-r-2 lg:border-black">
        <div className="logo font-semibold mb-4 px-4 lg:px-0 lg:p-4">
          ArtSwitch
        </div>
        <section className="block relative px-4 lg:hidden">
          <img
            src={"/assets/svgs/bg-mobile.svg"}
            alt=""
            className="object-contain w-24 h-24"
          />
        </section>
        <div className="login-form flex h-3/5 flex-col items-center justify-center lg:h-5/6">
          <p className="font-semibold text-4xl mb-4">Welcome Back</p>
          <LoginForm />
          <p className="text-sm font-semibold">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="underline cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </section>
      <section className="hidden lg:block relative">
        <img
          alt=""
          src={"/assets/svgs/bg-desktop.svg"}
          className="w-full h-screen object-cover"
        />
      </section>
    </div>
  );
};

export default Login;
