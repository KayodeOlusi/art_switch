import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import { signUpAnimations } from "utils/data";
import { NextPageWithLayout } from "utils/typings/app";
import SignupForm from "../../components/auth/signup/signup-form";

const SignUp: NextPageWithLayout = () => {
  const [selectedAnimations, setSelectedAnimations] = React.useState<any>(
    signUpAnimations[Math.floor(Math.random() * signUpAnimations.length)]
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * signUpAnimations.length);
      setSelectedAnimations(signUpAnimations[randomIndex]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [selectedAnimations]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimations,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
      <section
        className="hidden lg:block relative bg-gradient-to-bl 
       from-orange-100 via-orange-200 to-green-100"
      >
        <div className="w-full h-screen">
          <Lottie
            speed={0.5}
            width={"100%"}
            height={"100%"}
            options={defaultOptions}
            isClickToPauseDisabled={true}
          />
        </div>
      </section>
    </div>
  );
};

SignUp.getLayout = function getLayout(page) {
  return page;
};

export default SignUp;
