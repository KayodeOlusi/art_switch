import Stories from "@/components/home/posts/stories";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { testStories } from "../../utils/data";
import { render, screen } from "@testing-library/react";
import Story from "@/components/home/posts/story";

const MockedStories = () => (
  <Provider store={store}>
    <Stories stories={testStories} />
  </Provider>
);

describe("Stories Test", () => {
  it("should render the stories component", () => {
    render(<MockedStories />);

    const stories = screen.getByTestId("stories");
    expect(stories).toBeInTheDocument();
  });

  it("should render the correct amount of stories", () => {
    render(<MockedStories />);

    const stories = screen.getByTestId("stories");
    expect(stories.children.length).toBe(3);
  });

  it("should render an avatar for a story", () => {
    render(<Story {...testStories[0]} />);

    const avatar = screen.getByRole("img");

    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", testStories[0].avatar);
  });

  const itShouldRenderTheUsersNameForEachStory = (
    name: string,
    index: number
  ) =>
    it(`should render ${name}'s name for his story`, () => {
      render(<Story {...testStories[index]} />);

      const userName = screen.getByText(
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
