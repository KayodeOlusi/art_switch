jest.mock("../../hooks/posts/usePosts");

import Tag from "@/components/home/explore/tag";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetPostsByTag } from "../../hooks/posts/usePosts";
import ExploreContainer from "@/components/containers/home/explore-container";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const MockedExploreContainer = () => {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <ExploreContainer />
    </QueryClientProvider>
  );
};

const mockedUseGetPostsByTag = useGetPostsByTag as jest.Mock<any>;

describe("Tag test", () => {
  const mockedSetState = jest.fn();

  beforeEach(() => {
    mockedUseGetPostsByTag.mockReturnValue({
      data: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const itShouldRenderTheActiveTagWithItsClass = (tag: string) =>
    it("should render the active tag with an active class", () => {
      render(<Tag tag={tag} activeTag={tag} setActiveTag={mockedSetState} />);
      const activeTag = screen.getByText(tag);

      expect(activeTag).toBeInTheDocument();
      expect(activeTag).toHaveClass("bg-appPrimary");
    });

  const itShouldRenderTheAInActiveTagWithItsClass = (
    activeTag: string,
    inactive: string
  ) =>
    it("should render the inactive tag without the active class", () => {
      render(
        <Tag
          tag={inactive}
          activeTag={activeTag}
          setActiveTag={mockedSetState}
        />
      );
      const inactiveTag = screen.getByText(inactive);
      expect(inactiveTag).toBeInTheDocument();
      expect(inactiveTag).not.toHaveClass("bg-appPrimary");
    });

  describe("Tags", () => {
    itShouldRenderTheActiveTagWithItsClass("Product");
    itShouldRenderTheAInActiveTagWithItsClass("Product", "Art");
  });

  describe("Active tag click functionality Test", () => {
    const tags = ["Product", "Art", "Life", "Design", "Tech", "Music", "Food"];

    const renderTag = (tags: string[]) =>
      tags.map(tag => {
        render(
          <Tag
            tag={tag}
            key={tag}
            activeTag="Life"
            setActiveTag={mockedSetState}
          />
        );
      });

    it("should use the right class for a clicked tag", async () => {
      render(<MockedExploreContainer />);
      const activeTag = screen.getByText("design");

      act(() => ReactTestUtils.Simulate.click(activeTag));
      expect(activeTag).toHaveClass("bg-appPrimary");
    });

    it("should call the setState function when a tag is clicked once", () => {
      renderTag(tags);
      const activeTag = screen.getByText("Design");

      fireEvent.click(activeTag);

      expect(mockedSetState).toHaveBeenCalledTimes(1);
      expect(mockedSetState).toHaveBeenCalledWith("Design");
    });
  });

  describe("API Calls", () => {
    it("should show loader when fetching posts by tag", () => {
      mockedUseGetPostsByTag.mockReturnValue({
        isLoading: true,
      });

      render(<MockedExploreContainer />);
      const appSpinner = screen.getByTestId("app-loader");

      expect(appSpinner).not.toBeNull();
      expect(appSpinner).toBeInTheDocument();
    });

    it("should show error message and when there is an error fetching posts by tag", async () => {
      mockedUseGetPostsByTag.mockReturnValue({
        error: true,
      });

      render(<MockedExploreContainer />);
      const errorMessage = screen.getByRole("alert");

      expect(errorMessage).not.toBeNull();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
