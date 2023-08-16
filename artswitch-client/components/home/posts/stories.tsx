import React from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  StoriesState,
  selectStories,
} from "../../../redux/features/slices/stories";
import Story from "./story";

type Props = StoriesState;

const Stories = ({ stories }: Props) => {
  const allStories = React.useMemo(() => stories, [stories]);

  return (
    <div
      data-testid="stories"
      className="mt-3 flex space-x-2 overflow-x-scroll border-gray-100
      rounded-lg bg-white px-3 py-5"
    >
      {allStories.map(story => (
        <div key={story.id}>
          <Story {...story} />
        </div>
      ))}
    </div>
  );
};

export default Stories;
