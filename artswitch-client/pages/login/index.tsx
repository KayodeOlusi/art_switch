import React from "react";
import Link from "next/link";
import Lottie from "react-lottie";
import { signInAnimations } from "utils/data";
import { NextPageWithLayout } from "utils/typings/app";
import LoginForm from "../../components/auth/login/login-form";
import Head from "next/head";

const Login: NextPageWithLayout = () => {
  const [selectedAnimations, setSelectedAnimations] = React.useState<any>(
    signInAnimations[Math.floor(Math.random() * signInAnimations.length)]
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * signInAnimations.length);
      setSelectedAnimations(signInAnimations[randomIndex]);
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
      data-testid="login-page"
      className="grid grid-cols-2 h-screen font-Inter"
    >
      <Head>
        <title>ArtSwitch | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className="form-section block p-4 col-span-2 lg:col-span-1
        lg:border-r-2 lg:border-black"
      >
        <div className="logo mb-4 px-4 lg:px-0 lg:p-4">
          <h1 className="font-semibold">ArtSwitch</h1>
        </div>
        <section className="block relative px-4 lg:hidden">
          <div className="w-16 h-16">
            <img
              alt="mobile"
              src={"/assets/svgs/bg-mobile.svg"}
              className="object-contain w-full h-full"
            />
          </div>
        </section>
        <div className="login-form flex h-3/5 flex-col items-center justify-center lg:h-5/6">
          <p className="font-semibold text-4xl mb-4">Welcome Back</p>
          <LoginForm />
          <p className="text-sm font-semibold">
            Don't have an account?{" "}
            <Link href="/signup">
              <span className="underline cursor-pointer">Sign Up</span>
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

Login.getLayout = function getLayout(page) {
  return page;
};

export default Login;
