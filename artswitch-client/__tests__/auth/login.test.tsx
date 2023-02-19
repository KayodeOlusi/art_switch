import Login from "../../pages/login";
import LoginForm from "../../components/auth/login/login-form";
import { screen, render, fireEvent } from "@testing-library/react";

type IOnChangeLogin = {
  text: string;
  placeholder: string;
};

describe("Login Views", () => {
  it("should render the login page", () => {
    render(<Login />);
    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();
  });

  it("should render the login header", () => {
    render(<Login />);
    const loginHeader = screen.getByText("Welcome Back");
    expect(loginHeader).toBeInTheDocument();
  });

  it("should render the login email input", () => {
    render(<LoginForm />);
    const loginEmailInputField =
      screen.getByPlaceholderText("Enter your email");
    expect(loginEmailInputField).toBeInTheDocument();
  });

  it("should render the login password input", () => {
    render(<LoginForm />);
    const loginPasswordInputField = screen.getByPlaceholderText("Password");
    expect(loginPasswordInputField).toBeInTheDocument();
  });

  it("should render the login button", () => {
    render(<LoginForm />);
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });

  const itShouldFireOnChangeEventForInputElements = (data: IOnChangeLogin) =>
    describe("LoginForm Events", () => {
      it("should change the user input onChange event", () => {
        render(<LoginForm />);
        const inputField = screen.getByPlaceholderText(data.placeholder);
        fireEvent.change(inputField, { target: { value: data.text } });

        expect(inputField).toHaveValue(data.text);
      });
    });

  itShouldFireOnChangeEventForInputElements({
    text: "johndoe@gmail.com",
    placeholder: "Enter your email",
  });
  itShouldFireOnChangeEventForInputElements({
    text: "johndoe",
    placeholder: "Password",
  });
});
