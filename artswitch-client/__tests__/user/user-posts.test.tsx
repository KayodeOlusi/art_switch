import {
  roleElement,
  textElement,
  testIdElement,
} from "utils/lib/test-helpers";
import { testPosts } from "utils/data";
import { getTestLayout } from "utils/lib/wrappers";
import { cleanup, render } from "@testing-library/react";
import UserPosts from "@/components/user/user-posts";

describe("User Posts", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should show the loader animation when posts are loading", () => {
    const postsElement = getTestLayout(
      <UserPosts {...{ loading: true, error: null }} posts={[]} />,
      "redux-react-query"
    );

    render(postsElement);
    const loaderElement = roleElement("progressbar");

    expect(loaderElement).toBeInTheDocument();
  });

  it("should show the error message when there is an error fetching posts", () => {
    const postsElement = getTestLayout(
      <UserPosts {...{ loading: false, error: true }} posts={[]} />,
      "redux-react-query"
    );

    render(postsElement);
    const errorElement = roleElement("alert");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(
      "An error occurred while fetching posts. Please try again later."
    );
  });

  it("should display a message for no posts when there are no posts from the user", () => {
    const postsElement = getTestLayout(
      <UserPosts {...{ loading: false, error: false }} posts={[]} />,
      "redux-react-query"
    );

    render(postsElement);
    const noPostsElement = textElement("No posts found.");

    expect(noPostsElement).toBeInTheDocument();
  });

  const itShouldHaveTheCorrectNumberOfPostsForAUserWithPosts = (
    length: number
  ) => {
    it("should have the correct number of posts when user has posts", () => {
      const postsElement = getTestLayout(
        <UserPosts
          {...{ loading: false, error: false }}
          posts={testPosts.slice(0, length)}
        />,
        "redux-react-query"
      );

      render(postsElement);
      const postsContainer = testIdElement("user-posts-container");

      expect(postsContainer.children).toHaveLength(length);
    });
  };

  describe("User with posts", () => {
    itShouldHaveTheCorrectNumberOfPostsForAUserWithPosts(1);
    itShouldHaveTheCorrectNumberOfPostsForAUserWithPosts(2);
    itShouldHaveTheCorrectNumberOfPostsForAUserWithPosts(5);
  });
});
