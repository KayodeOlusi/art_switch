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

  it("should render the post component with its props", () => {
    mockedUseGetFeedPosts.mockReturnValue({
      data: testPosts,
    });

    render(<Post {...testPosts[0]} />);
  });
});
