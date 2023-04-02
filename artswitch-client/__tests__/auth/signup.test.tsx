import SignUp from "../../pages/signup";
import HttpClient from "../../services/client";
import ReactTestUtils from "react-dom/test-utils";
import SignupForm from "../../components/auth/signup/signup-form";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";

type IOnChangeSignUp = {
  text: string;
  placeholder: string;
};

const mockedHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
mockedHttpClient.post = jest.fn();

describe("SignUp Test", () => {
  const roleElement = (role: string) => screen.getByRole(role);
  const textElement = (text: string) => screen.getByText(text);
  const testIdElement = (testId: string) => screen.getByTestId(testId);
  const inputField = (field: string) => screen.getByPlaceholderText(field);

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render the signup page", () => {
    render(<SignUp />);
    expect(testIdElement("signup-page")).toBeInTheDocument();
  });

  it("should render the signup header", () => {
    render(<SignUp />);
    expect(textElement("Join the party")).toBeInTheDocument();
  });

  it("should render the signup button", () => {
    render(<SignupForm />);
    expect(roleElement("button")).toBeInTheDocument();
  });

  const itShouldRenderInputField = (text: string) =>
    it(`should render the appropriate input field`, () => {
      render(<SignupForm />);
      expect(inputField(text)).toBeInTheDocument();
    });

  const itShouldFireOnChangeEventForInputElements = (data: IOnChangeSignUp) =>
    it("should change the user input onChange event", () => {
      render(<SignupForm />);

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

  describe("Name Input Field", () => {
    itShouldRenderInputField("Enter your Full name");
    itShouldFireOnChangeEventForInputElements({
      text: "John Doe",
      placeholder: "Enter your Full name",
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
    it("should prevent the default action of onSubmit in form", () => {
      const preventDefault = jest.fn();

      render(<SignUp />);
      ReactTestUtils.Simulate.submit(testIdElement("signup-form"), {
        preventDefault,
      });

      expect(preventDefault).toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it("should call the signup HttpClient instance with it's appropriate arguments", () => {
      render(<SignupForm />);

      fireEvent.submit(testIdElement("signup-form"));

      expect(mockedHttpClient.post).toHaveBeenCalled();
      expect(mockedHttpClient.post).toHaveBeenCalledTimes(1);
      expect(mockedHttpClient.post).toHaveBeenCalledWith(
        "auth/signup",
        expect.objectContaining({
          name: "",
          email: "",
          password: "",
        })
      );
    });
  });
});
