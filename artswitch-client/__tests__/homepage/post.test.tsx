jest.mock("../../utils/hooks/posts/usePosts");

import { testPosts } from "utils/data";
import Post from "@/components/home/posts/post";
import { getTestLayout } from "utils/lib/wrappers";
import { useGetFeedPosts } from "utils/hooks/posts/usePosts";
import { screen, render, cleanup } from "@testing-library/react";
import PostsContainer from "@/components/containers/home/posts-container";

const mockedUseGetFeedPosts = useGetFeedPosts as jest.Mock<any>;
const element = getTestLayout(<PostsContainer />, "redux-react-query");

describe("Posts Container Test", () => {
  beforeEach(() => {
    mockedUseGetFeedPosts.mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render the posts container", () => {
    render(element);

    const postsContainer = screen.getByTestId("post-container");
    expect(postsContainer).toBeInTheDocument();
  });

  it("should render the posts-view container", () => {
    render(element);
    const postsView = screen.getByTestId("posts-view");

    expect(postsView.id).toBe("post-view");
    expect(postsView).toBeInTheDocument();
  });

  it("should render the correct number of posts when data is available", () => {
    mockedUseGetFeedPosts.mockReturnValue({
      data: testPosts,
    });

    render(element);
    const postView = screen.getByTestId("posts-view");

    expect(postView.children.length).toBe(testPosts.length);
  });

  describe("Single Posts test", () => {
    beforeEach(() => {
      mockedUseGetFeedPosts.mockReturnValue({
        data: testPosts,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    const itShouldRenderThePostComponentWithItsApprovedProps = (idx: number) =>
      it("should render the post component with its props", () => {
        render(<Post {...testPosts[idx]} />);
        expect(testPosts[idx]).toMatchObject(testPosts[idx]);
      });

    itShouldRenderThePostComponentWithItsApprovedProps(0);
    itShouldRenderThePostComponentWithItsApprovedProps(2);
    itShouldRenderThePostComponentWithItsApprovedProps(5);

    it("should render the profile picture of a user who has a post", () => {
      render(<Post {...testPosts[0]} />);

      const profilePictureElement = screen.getByAltText("Profile Picture");
      expect(profilePictureElement).toBeInTheDocument();
    });

    it("should render the author of the post name and username", () => {
      render(<Post {...testPosts[0]} />);
      const userDetailsElement = document.querySelector("#user-details");

      expect(userDetailsElement).toBeInTheDocument();
      expect(userDetailsElement?.children).toHaveLength(2);
      expect(userDetailsElement?.children[0]).toHaveTextContent(
        testPosts[0]?.user?.name
      );
      expect(userDetailsElement?.children[1]).toHaveTextContent(
        testPosts[0]?.user?.username
      );
    });

    it("should render the post image when there is one", () => {
      render(<Post {...testPosts[0]} />);
      const postPictureElement = screen.getByAltText("Post Image");

      expect(postPictureElement).toBeInTheDocument();
      expect(postPictureElement?.getAttribute("alt")).toBe("Post Image");
      expect(postPictureElement.getAttribute("src")).not.toBe("");
    });

    it("should not render the post image when there is no post image", () => {
      render(<Post {...testPosts[4]} />);
      const postPictureElement = screen.queryByAltText("Post Image");

      expect(postPictureElement).not.toBeInTheDocument();
    });
  });
});
