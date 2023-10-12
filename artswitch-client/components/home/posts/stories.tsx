import React from "react";
import Story from "./story";
import useModal from "utils/hooks/useModal";
import { StoriesState } from "features/slices/stories";
import { MODAL_VIEWS } from "utils/typings/app";

type Props = StoriesState;

const Stories = ({ stories }: Props) => {
  const { openModal, setModalViewData } = useModal();
  const allStories = React.useMemo(() => stories, [stories]);

  const onStoryClick = (story: StoriesState["stories"][0]) => {
    setModalViewData(story);
    openModal(MODAL_VIEWS.VIEW_STORY);
  };

  return (
    <div
      data-testid="stories"
      className="mt-3 flex space-x-2 overflow-x-scroll border-gray-100
      rounded-lg bg-white px-3 py-5"
    >
      {allStories.map(story => (
        <div key={story.id}>
          <Story {...story} onClick={() => onStoryClick(story)} />
        </div>
      ))}
    </div>
  );
};

export default Stories;
