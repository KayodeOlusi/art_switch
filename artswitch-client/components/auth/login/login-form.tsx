import Button from "../button";
import React, { FormEvent } from "react";
import { loginUser } from "../../../services/auth";

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
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState<TFormState>({
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
    setLoading(true);

    await loginUser(formState, () => {
      console.log("Login Successful");
      setLoading(false);
    });
  };

  return (
    <form
      className="flex flex-col"
      data-testid="login-form"
      onSubmit={handleSubmit}
    >
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
      <Button type="login" loading={loading} />
    </form>
  );
};

export default LoginForm;
