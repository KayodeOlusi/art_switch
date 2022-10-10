import { NextPage } from "next";
import Image from "next/image";
import Button from "../../../components/auth/button";

type Props = {};

const Login: NextPage = (props: Props) => {
  return (
    <div className="grid grid-cols-2 h-screen font-Inter">
      <section className="form-section block p-4">
        <div className="logo font-semibold">ArtSwitch</div>
        <div className="login-form">
          <p>Welcome Back</p>
          <form className="flex flex-col" onSubmit={() => {}}>
            <input type="text" placeholder="Enter your email" />
            <input type="password" placeholder="Password" />
            <section>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </section>
            <Button />
          </form>
          <p>Don't have an account? Sign Up</p>
        </div>
      </section>
      <section className="image-section block">
        <Image src={""} alt="ArtSwitch" />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti omnis
        quidem nisi ex architecto temporibus veritatis voluptatibus laborum
        odit, laboriosam tempora ut incidunt adipisci quod minima! Blanditiis
        saepe dolores ipsa!
      </section>
    </div>
  );
};

export default Login;
