import Login from "../../pages/login";
import HttpClient from "../../services/client";
import ReactTestUtils from "react-dom/test-utils";
import LoginForm from "../../components/auth/login/login-form";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

type IOnChangeLogin = {
  text: string;
  placeholder: string;
};

const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
mockHttpClient.post = jest.fn();

describe("Login Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const roleElement = (role: string) => screen.getByRole(role);
  const textElement = (text: string) => screen.getByText(text);
  const testIdElement = (testId: string) => screen.getByTestId(testId);
  const inputField = (text: string) => screen.getByPlaceholderText(text);

  it("should render the login page", () => {
    render(<Login />);
    expect(testIdElement("login-page")).not.toBeNull();
    expect(testIdElement("login-page")).toBeInTheDocument();
  });

  it("should render the login header", () => {
    render(<Login />);
    const loginHeader = screen.getByText("Welcome Back");
    expect(loginHeader).not.toBeNull();
    expect(loginHeader).toBeInTheDocument();
  });

  it("should render the login button", () => {
    render(<LoginForm />);
    expect(roleElement("button")).not.toBeNull();
    expect(roleElement("button")).toBeInTheDocument();
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

  describe("API Calls", () => {
    it("should prevent the default action of onSubmit in form", async () => {
      const preventDefault = jest.fn();

      render(<LoginForm />);
      ReactTestUtils.Simulate.submit(testIdElement("login-form"), {
        preventDefault,
      });

      expect(preventDefault).toHaveBeenCalled();
    });

    it("should call the HttpClient for login with the appropriate arguments", async () => {
      render(<LoginForm />);

      const form = testIdElement("login-form");
      fireEvent.submit(form);

      expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        "auth/login",
        expect.objectContaining({
          email: "",
          password: "",
        })
      );
    });
  });
});
