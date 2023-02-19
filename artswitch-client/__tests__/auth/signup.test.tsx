import SignUp from "../../pages/signup";
import SignupForm from "../../components/auth/signup/signup-form";
import { screen, render, fireEvent } from "@testing-library/react";

type IOnChangeSignUp = {
  text: string;
  placeholder: string;
};

describe("Login Views", () => {
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

  it("should render the signup email input", () => {
    render(<SignupForm />);
    const signupFormEmailInput =
      screen.getByPlaceholderText("Enter your email");
    expect(signupFormEmailInput).toBeInTheDocument();
  });

  it("should render the signup name input", () => {
    render(<SignupForm />);
    const signupFormNameInput = screen.getByPlaceholderText(
      "Enter your Full name"
    );
    expect(signupFormNameInput).toBeInTheDocument();
  });

  it("should render the signup password input", () => {
    render(<SignupForm />);
    const signupFormPasswordInput = screen.getByPlaceholderText("Password");
    expect(signupFormPasswordInput).toBeInTheDocument();
  });

  it("should render the signup button", () => {
    render(<SignupForm />);
    const signUpButton = screen.getByRole("button");
    expect(signUpButton).toBeInTheDocument();
  });

  const itShouldFireOnChangeEventForInputElements = (data: IOnChangeSignUp) =>
    describe("Login Events", () => {
      it("should change the user input onChange event", () => {
        render(<SignupForm />);
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
    text: "John Doe",
    placeholder: "Enter your Full name",
  });
  itShouldFireOnChangeEventForInputElements({
    text: "johndoe",
    placeholder: "Password",
  });
});
