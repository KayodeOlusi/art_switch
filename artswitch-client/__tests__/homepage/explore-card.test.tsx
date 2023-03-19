import Tag from "@/components/home/explore/tag";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Tag test", () => {
  let tags: string[];
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

    beforeEach(() => {
      tags = ["Product", "Art", "Life", "Design", "Tech", "Music", "Food"];
      renderTag(tags);
    });

    it("should call the setState function when a tag is clicked once", () => {
      expect.hasAssertions();

      const activeTag = screen.getByText("Design");
      fireEvent.click(activeTag);

      expect(mockedSetState).toHaveBeenCalledTimes(1);
      expect(mockedSetState).toHaveBeenCalledWith("Design");
    });
  });
});
