import Link from "next/link";
import { NextPageWithLayout } from "utils/typings/app";
import SignupForm from "../../components/auth/signup/signup-form";

const SignUp: NextPageWithLayout = () => {
  return (
    <div
      data-testid="signup-page"
      className="grid grid-cols-2 h-screen font-Inter"
    >
      <section className="form-section block p-4 col-span-2 lg:col-span-1 lg:border-r-2 lg:border-black">
        <div className="logo font-semibold mb-4 px-4 lg:px-0 lg:p-4">
          ArtSwitch
        </div>
        <section className="block relative px-4 lg:hidden">
          <img
            alt=""
            src={"/assets/svgs/bg-mobile.svg"}
            className="object-contain w-24 h-24"
          />
        </section>
        <div className="login-form h-2/3 flex flex-col items-center justify-center lg:h-5/6">
          <p className="font-semibold text-4xl mb-4">Join the party</p>
          <SignupForm />
          <p className="text-sm font-semibold">
            Already have an account?{" "}
            <Link href="/login">
              <span className="underline cursor-pointer">Sign In</span>
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

SignUp.getLayout = function getLayout(page) {
  return page;
};

export default SignUp;
