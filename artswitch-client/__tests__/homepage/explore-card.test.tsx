jest.mock("../../hooks/posts/usePosts");

import { testPostByTag } from "utils/data";
import Tag from "@/components/home/explore/tag";
import { getTestLayout } from "utils/lib/wrappers";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { useGetPostsByTag } from "../../hooks/posts/usePosts";
import ExploreContainer from "@/components/containers/home/explore-container";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

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
      const element = getTestLayout(<ExploreContainer />, "react-query");

      render(element);
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
      const element = getTestLayout(<ExploreContainer />, "react-query");
      mockedUseGetPostsByTag.mockReturnValue({
        isLoading: true,
      });

      render(element);
      const appSpinner = screen.getByTestId("app-loader");

      expect(appSpinner).not.toBeNull();
      expect(appSpinner).toBeInTheDocument();
    });

    it("should show error message when there is an error fetching posts by tag", async () => {
      const element = getTestLayout(<ExploreContainer />, "react-query");
      mockedUseGetPostsByTag.mockReturnValue({
        error: true,
      });

      render(element);
      const errorMessage = screen.getByRole("alert");

      expect(errorMessage).not.toBeNull();
      expect(errorMessage).toBeInTheDocument();
    });

    it(`should show the post container and children based 
      on the clicked tag when there is data`, async () => {
      const element = getTestLayout(<ExploreContainer />, "react-query");
      mockedUseGetPostsByTag.mockReturnValue({
        error: false,
        isLoading: false,
        data: {
          message: "success",
          data: testPostByTag.slice(0, 3),
        },
      });

      render(element);
      const postContainer = screen.getByTestId("post-container");

      expect(postContainer).not.toBeNull();
    });

    const itShouldRenderTheAppropriateLengthOfPostContainerAndChildren = (
      startIdx: number,
      endIdx: number
    ) =>
      it(`should render the appropriate length of post container
       and children when there are posts`, () => {
        const element = getTestLayout(<ExploreContainer />, "react-query");
        mockedUseGetPostsByTag.mockReturnValue({
          error: false,
          isLoading: false,
          data: {
            message: "success",
            data: testPostByTag.slice(startIdx, endIdx),
          },
        });

        render(element);
        const postContainer = screen.getByTestId("post-container");

        expect(postContainer.children.length).toBe(Math.ceil(endIdx / 3));
      });

    itShouldRenderTheAppropriateLengthOfPostContainerAndChildren(0, 3);
    itShouldRenderTheAppropriateLengthOfPostContainerAndChildren(0, 4);
    itShouldRenderTheAppropriateLengthOfPostContainerAndChildren(0, 7);
  });
});
