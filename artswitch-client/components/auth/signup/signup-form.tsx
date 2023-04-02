import Button from "../button";
import { useState } from "react";
import toast from "react-hot-toast";
import { signupUser } from "../../../services/auth";

type TFormState = {
  name: string;
  email: string;
  password: string;
};

type TEvent = {
  target: {
    name: string;
    value: string;
  };
};

const SignupForm = () => {
  const [formState, setFormState] = useState<TFormState>({
    name: "",
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

    const data = await signupUser(formState);
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
        className="border-2 border-gray-800 w-80 text-sm px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formState.email}
        placeholder="Enter your email"
        className="border-2 border-gray-800 w-80 text-sm px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password}
        className="border-2 border-gray-800 w-80 text-sm px-4 py-3 text-black rounded-md mb-6"
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
  );
};

export default SignupForm;
