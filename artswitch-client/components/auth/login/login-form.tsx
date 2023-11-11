import Button from "../button";
import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../../../utils/services/auth";

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
  const router = useRouter();
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

    await loginUser(
      formState,
      async () => {
        setLoading(false);
        await router.push("/");
        router.reload();
      },
      () => setLoading(false)
    );
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
      <Button type="login" loading={loading} />
    </form>
  );
};

export default LoginForm;
