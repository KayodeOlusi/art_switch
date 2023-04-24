import Stories from "@/components/home/posts/stories";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { testStories } from "../../utils/data";
import { render, screen } from "@testing-library/react";
import { loadStories } from "../../features/slices/stories";

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
    store.dispatch(loadStories());

    const stories = screen.getByTestId("stories");
    expect(stories.children.length).toBe(3);
  });
});
