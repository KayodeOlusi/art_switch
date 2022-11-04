import Button from "../button";
import toast from "react-hot-toast";
import { useState, FormEvent } from "react";
import { login_user } from "../../../services/auth";

type TFormState = {
  email: string;
  password: string;
};

type TEvent = {
  target: {
    name: string;
    value: string;
  };
};

const LoginForm = () => {
  const [formState, setFormState] = useState<TFormState>({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }: TEvent) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login_user(formState);
      return toast.success("Login successful");
    } catch (error) {
      return toast.error((error as Error)?.message);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={formState.email}
        placeholder="Enter your email"
        className="border-2 border-gray-800 w-80 px-4 py-3 text-black rounded-md mb-6"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formState.password}
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
  );
};

export default LoginForm;
