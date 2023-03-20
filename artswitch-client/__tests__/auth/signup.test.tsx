import SignUp from "../../pages/signup";
import SignupForm from "../../components/auth/signup/signup-form";
import { screen, render, fireEvent } from "@testing-library/react";

type IOnChangeSignUp = {
  text: string;
  placeholder: string;
};

describe("Login Views", () => {
  const inputField = (text: string) => screen.getByPlaceholderText(text);

  it("should render the signup page", () => {
    render(<SignUp />);
    const signUpPage = screen.getByTestId("signup-page");
    expect(signUpPage).toBeInTheDocument();
  });

  it("should render the signup header", () => {
    render(<SignUp />);
    const signupHeader = screen.getByText("Join the party");
    expect(signupHeader).toBeInTheDocument();
  });

  it("should render the signup button", () => {
    render(<SignupForm />);
    const signUpButton = screen.getByRole("button");
    expect(signUpButton).toBeInTheDocument();
  });

  const itShouldRenderInputField = (text: string) =>
    it(`should render the appropriate input field`, () => {
      render(<SignupForm />);
      const input = inputField(text);
      expect(input).toBeInTheDocument();
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
});
