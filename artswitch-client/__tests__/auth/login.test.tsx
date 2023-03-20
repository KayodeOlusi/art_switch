import Login from "../../pages/login";
import LoginForm from "../../components/auth/login/login-form";
import { screen, render, fireEvent } from "@testing-library/react";

type IOnChangeLogin = {
  text: string;
  placeholder: string;
};

describe("Login Views", () => {
  const inputField = (text: string) => screen.getByPlaceholderText(text);

  it("should render the login page", () => {
    render(<Login />);
    const loginPage = screen.getByTestId("login-page");
    expect(loginPage).not.toBeNull();
    expect(loginPage).toBeInTheDocument();
  });

  it("should render the login header", () => {
    render(<Login />);
    const loginHeader = screen.getByText("Welcome Back");
    expect(loginHeader).not.toBeNull();
    expect(loginHeader).toBeInTheDocument();
  });

  it("should render the login button", () => {
    render(<LoginForm />);
    const loginButton = screen.getByRole("button");
    expect(loginButton).not.toBeNull();
    expect(loginButton).toBeInTheDocument();
  });

  const itShouldRenderInputField = (text: string) =>
    it(`should render the appropriate input field`, () => {
      render(<LoginForm />);
      const input = inputField(text);
      expect(input).toBeInTheDocument();
    });

  const itShouldFireOnChangeEventForInputElements = (data: IOnChangeLogin) =>
    it("should trigger onChange event on user input", () => {
      render(<LoginForm />);
      const inputField = screen.getByPlaceholderText(data.placeholder);
      fireEvent.change(inputField, { target: { value: data.text } });

      expect(inputField).toHaveValue(data.text);
    });

  describe("Email Input Field", () => {
    itShouldRenderInputField("Enter your email");
    itShouldFireOnChangeEventForInputElements({
      text: "johndoe@gmail.com",
      placeholder: "Enter your email",
    });
  });

  describe("Password Input Field", () => {
    itShouldRenderInputField("Password");
    itShouldFireOnChangeEventForInputElements({
      text: "johndoe",
      placeholder: "Password",
    });
  });
});
