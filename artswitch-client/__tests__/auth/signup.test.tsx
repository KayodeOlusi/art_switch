import {
  screen,
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from "@testing-library/react";
import {
  inputField,
  roleElement,
  testIdElement,
  textElement,
} from "utils/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import SignUp from "../../pages/signup";
import HttpClient from "../../utils/services/client";
import ReactTestUtils from "react-dom/test-utils";
import SignupForm from "../../components/auth/signup/signup-form";

type IOnChangeSignUp = {
  text: string;
  placeholder: string;
};

const mockedHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
mockedHttpClient.post = jest.fn();

describe("SignUp Test", () => {
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
    it("should prevent the default action of onSubmit in form", async () => {
      const preventDefault = jest.fn();
      render(<SignUp />);

      act(() => {
        ReactTestUtils.Simulate.submit(testIdElement("signup-form"), {
          preventDefault,
        });
      });

      await waitFor(() => {
        expect(preventDefault).toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalledTimes(1);
      });
    });

    it("should call the signup HttpClient instance with it's appropriate arguments", async () => {
      render(<SignupForm />);

      act(() => {
        fireEvent.submit(testIdElement("signup-form"));
      });

      await waitFor(() => {
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

    it("should call error toast when the signup fails", async () => {
      mockedHttpClient.post.mockRejectedValueOnce({
        response: {
          data: {
            message: "Something went wrong",
          },
        },
      });

      render(<SignupForm />);
      const form = testIdElement("signup-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith("Something went wrong");
      });
    });

    it("should call success toast when the signup is successful", async () => {
      mockedHttpClient.post.mockResolvedValueOnce({
        data: {
          message: "Signup successful",
        },
      });

      render(<SignupForm />);
      const form = testIdElement("signup-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith("Signup successful");
      });
    });

    it("should route to the login page when the signup is successful", async () => {
      const router = useRouter();
      mockedHttpClient.post.mockResolvedValueOnce({
        data: {
          message: "Signup successful",
        },
      });

      render(<SignupForm />);
      const form = testIdElement("signup-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(router.push).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith("/login");
      });
    });
  });
});
