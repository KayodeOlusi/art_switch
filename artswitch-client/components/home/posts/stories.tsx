import React from "react";
import { useAppSelector } from "app/hooks";
import { selectStories } from "features/slices/stories";
import Story from "./story";

type Props = {};

const Stories = (props: Props) => {
  const stories = useAppSelector(selectStories);

  return (
    <div
      className="mt-3 flex space-x-2 overflow-x-scroll border-gray-100
     rounded-lg bg-white px-3 py-5"
    >
      {stories.map(story => (
        <div key={story.id}>
          <Story {...story} />
        </div>
      ))}
    </div>
  );
};

export default Stories;
