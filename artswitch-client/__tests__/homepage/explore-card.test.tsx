import Tag from "@/components/home/explore/tag";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Active tag test", () => {
  let tags: string[];
  const mockedSetState = jest.fn();

  it("should render the active tag", () => {
    render(
      <Tag tag="Product" activeTag="Product" setActiveTag={mockedSetState} />
    );
    const activeTag = screen.getByText("Product");
    expect(activeTag).toBeInTheDocument();
  });

  it("should have the active tag class for active tag", () => {
    render(
      <Tag tag="Product" activeTag="Product" setActiveTag={mockedSetState} />
    );
    const activeTag = screen.getByText("Product");
    expect(activeTag).toHaveClass("bg-appPrimary");
  });

  it("should render the inactive tag", () => {
    render(
      <Tag tag="Product" activeTag="Life" setActiveTag={mockedSetState} />
    );
    const inactiveTag = screen.getByText("Product");
    expect(inactiveTag).toBeInTheDocument();
  });

  it("should not have the active tag class for inactive tag", () => {
    render(
      <Tag tag="Product" activeTag="Life" setActiveTag={mockedSetState} />
    );
    const activeTag = screen.getByText("Product");
    expect(activeTag).not.toHaveClass("bg-appPrimary");
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
      const activeTag = screen.getByText("Design");
      fireEvent.click(activeTag);
      expect(mockedSetState).toHaveBeenCalledTimes(1);
      expect(mockedSetState).toHaveBeenCalledWith("Design");
    });
  });
});
