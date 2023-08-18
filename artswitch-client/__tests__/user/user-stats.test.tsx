import { getTestLayout } from "utils/lib/wrappers";
import { testUserAccountDetails } from "utils/data";
import UserStats from "@/components/user/user-stats";
import { cleanup, render, screen } from "@testing-library/react";

const element = getTestLayout(
  <UserStats {...testUserAccountDetails} />,
  "redux-react-query"
);

describe("User Stats", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the user stats component", () => {
    render(element);
    const userStatsContainer = screen.getByTestId("user-stats-container");

    expect(userStatsContainer).toBeInTheDocument();
    expect(userStatsContainer).not.toBeNull();
  });

  it("should show the user's profile picture", () => {
    render(element);
    const profilePictureElement = screen.getByRole("img") as HTMLImageElement;

    expect(profilePictureElement).toBeInTheDocument();
    expect(profilePictureElement).toHaveAttribute("src");
    expect(profilePictureElement.src).toBe(
      testUserAccountDetails.profilePicture
    );
  });

  it("should show the user's name and username container", () => {
    render(element);
    const userNameContainer = document.querySelector("#user-name");

    expect(userNameContainer).toBeInTheDocument();
    expect(userNameContainer?.children.length).toBe(2);
  });

  it("should show the user's name and username value", () => {
    render(element);
    const userNameContainer = document.querySelector("#user-name");

    expect(userNameContainer?.children[0]).toHaveTextContent(
      testUserAccountDetails.name
    );
    expect(userNameContainer?.children[1]).toHaveTextContent(
      testUserAccountDetails.username
    );
  });

  it("should show the correct number of user followers for a user", () => {
    render(element);
    const followersContainer = document.querySelector("#followers");

    expect(followersContainer?.children.length).toBe(2);
    expect(followersContainer?.children[1]).toHaveTextContent(
      testUserAccountDetails["follow-details"].followers.length.toString()
    );
  });

  it("should show the correct number of following users for a user", () => {
    render(element);
    const followersContainer = document.querySelector("#following");

    expect(followersContainer?.children.length).toBe(2);
    expect(followersContainer?.children[1]).toHaveTextContent(
      testUserAccountDetails["follow-details"].following.length.toString()
    );
  });
});
