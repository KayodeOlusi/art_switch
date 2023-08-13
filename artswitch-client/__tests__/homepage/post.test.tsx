jest.mock("../../hooks/posts/usePosts");

import Post from "@/components/home/posts/post";
import { getTestLayout } from "utils/lib/wrappers";
import { useGetFeedPosts } from "hooks/posts/usePosts";
import { screen, render, cleanup } from "@testing-library/react";
import PostsContainer from "@/components/containers/home/posts-container";

const mockedUseGetFeedPosts = useGetFeedPosts as jest.Mock<any>;

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
    const element = getTestLayout(<PostsContainer />, "redux-react-query");
    render(element);

    const postsContainer = screen.getByTestId("post-container");
    expect(postsContainer).toBeInTheDocument();
  });
});
