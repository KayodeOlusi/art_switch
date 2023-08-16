import Button from "../button";
import React from "react";
import { signupUser } from "../../../utils/services/auth";
import { useRouter } from "next/router";

type TFormState = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type TEvent = {
  target: {
    name: string;
    value: string;
  };
};

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<TFormState>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: TEvent) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await signupUser(
      formState,
      () => {
        setLoading(false);
        router.push("/login");
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <form
      className="flex flex-col"
      data-testid="signup-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formState.name}
        placeholder="Enter your Full name"
        className="border-2 border-gray-800 w-80 text-sm
         px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={formState.username}
        placeholder="Enter a username"
        className="border-2 border-gray-800 w-80 text-sm
         px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formState.email}
        placeholder="Enter your email"
        className="border-2 border-gray-800 w-80 text-sm 
        px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password}
        className="border-2 border-gray-800 w-80 text-sm 
        px-4 py-3 text-black rounded-md mb-6"
      />
      {/* <section className="flex items-center mb-4">
        <input
          type="checkbox"
          id="remember-me"
          className="mr-2 cursor-pointer"
        />
        <label htmlFor="remember-me" className="text-sm font-semibold">
          Remember Me
        </label>
      </section> */}
      <Button type="signup" loading={loading} />
    </form>
  );
};

export default SignupForm;
