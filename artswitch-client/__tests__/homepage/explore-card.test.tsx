import ExploreContainer from "@/components/containers/home/explore-container";
import Tag from "@/components/home/explore/tag";
import { fireEvent, render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";

describe("Tag test", () => {
  const mockedSetState = jest.fn();

  const itShouldRenderTheActiveTagWithItsClass = (tag: string) =>
    it("should render the active tag with an active class", () => {
      render(<Tag tag={tag} activeTag={tag} setActiveTag={mockedSetState} />);
      const activeTag = screen.getByText(tag);

      expect(activeTag).toBeInTheDocument();
      expect(activeTag).toHaveClass("bg-appPrimary");
    });

  const itShouldRenderTheAInActiveTagWithItsClass = (
    tag: string,
    inactive: string
  ) =>
    it("should render the inactive tag without the active class", () => {
      render(
        <Tag tag={inactive} activeTag={tag} setActiveTag={mockedSetState} />
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

    it("should use the right class for a clicked tag", () => {
      render(<ExploreContainer />);
      const activeTag = screen.getByText("Design");

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
});
