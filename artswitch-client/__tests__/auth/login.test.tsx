import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Login from "../../pages/login";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import HttpClient from "../../utils/services/client";
import ReactTestUtils from "react-dom/test-utils";
import LoginForm from "../../components/auth/login/login-form";
import { inputField, roleElement, testIdElement } from "utils/lib/helpers";

type TOnChangeLogin = {
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

  const itShouldFireOnChangeEventForInputElements = (data: TOnChangeLogin) =>
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

      act(() => {
        ReactTestUtils.Simulate.submit(testIdElement("login-form"), {
          preventDefault,
        });
      });

      await waitFor(() => {
        expect(preventDefault).toHaveBeenCalled();
      });
    });

    it("should call the HttpClient for login with the appropriate arguments", async () => {
      render(<LoginForm />);
      const form = testIdElement("login-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
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

    it("should call error toast when the login fails", async () => {
      mockHttpClient.post.mockRejectedValueOnce({
        response: {
          data: {
            message: "Something went wrong",
          },
        },
      });

      render(<LoginForm />);
      const form = testIdElement("login-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith("Something went wrong");
      });
    });

    it("should call success toast when the login is successful", async () => {
      mockHttpClient.post.mockResolvedValueOnce({
        response: {
          data: {
            message: "Login successful",
          },
        },
      });

      render(<LoginForm />);
      const form = testIdElement("login-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith("Login successful");
      });
    });

    it("should route to the homepage when the login is successful", async () => {
      const router = useRouter();
      mockHttpClient.post.mockResolvedValueOnce({
        response: {
          data: {
            message: "Login successful",
          },
        },
      });

      render(<LoginForm />);
      const form = testIdElement("login-form");

      act(() => {
        fireEvent.submit(form);
      });

      await waitFor(() => {
        expect(router.push).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith("/");
      });
    });
  });
});
