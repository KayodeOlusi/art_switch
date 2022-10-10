import { NextPage } from "next";
import SignupForm from "../../../components/auth/signup/signup-form";

const SignUp: NextPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen font-Inter">
      <section className="form-section block p-4 col-span-2 lg:col-span-1">
        <div className="logo font-semibold">ArtSwitch</div>
        <div className="login-form h-5/6 flex flex-col items-center justify-center">
          <p className="font-semibold text-4xl mb-4">Join the party</p>
          <SignupForm />
          <p className="text-sm font-semibold">
            Don't have an account?{" "}
            <span className="underline cursor-pointer">Sign Up</span>
          </p>
        </div>
      </section>
      <section
        className="hidden lg:block bg-[url('/assets/images/bg.png')]
        bg-no-repeat bg-center object-cover w-full h-full"
      />
    </div>
  );
};

export default SignUp;
