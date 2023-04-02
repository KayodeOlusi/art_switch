import SignUp from "../../pages/signup";
import SignupForm from "../../components/auth/signup/signup-form";
import { screen, render, fireEvent } from "@testing-library/react";

type IOnChangeSignUp = {
  text: string;
  placeholder: string;
};

describe("SignUp Views", () => {
  const roleElement = (role: string) => screen.getByRole(role);
  const textElement = (text: string) => screen.getByText(text);
  const testIdElement = (testId: string) => screen.getByTestId(testId);
  const inputField = (field: string) => screen.getByPlaceholderText(field);

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
});
