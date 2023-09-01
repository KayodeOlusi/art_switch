import {
  roleElement,
  testIdElement,
  textElement,
} from "utils/lib/test-helpers";
import { testStories } from "../../utils/data";
import Story from "@/components/home/posts/story";
import { getTestLayout } from "utils/lib/wrappers";
import Stories from "@/components/home/posts/stories";
import { render } from "@testing-library/react";

const element = getTestLayout(<Stories stories={testStories} />, "redux");

describe("Stories Test", () => {
  it("should render the stories component", () => {
    render(element);

    const stories = testIdElement("stories");
    expect(stories).toBeInTheDocument();
  });

  it("should render the correct amount of stories", () => {
    render(element);

    const stories = testIdElement("stories");
    expect(stories.children.length).toBe(3);
  });

  it("should render an avatar for a story", () => {
    render(<Story {...testStories[0]} />);

    const avatar = roleElement("img");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", testStories[0].avatar);
  });

  const itShouldRenderTheUsersNameForEachStory = (
    name: string,
    index: number
  ) =>
    it(`should render ${name}'s name for his story`, () => {
      render(<Story {...testStories[index]} />);

      const userName = textElement(
        testStories[index].name.substring(0, 5).trim()
      );
      expect(userName).toBeInTheDocument();
      expect(userName.textContent).toMatch(name);
    });

  describe("User's story name", () => {
    itShouldRenderTheUsersNameForEachStory("John", 0);
    itShouldRenderTheUsersNameForEachStory("Luigi", 1);
  });
});
