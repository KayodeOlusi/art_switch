import { StoriesState } from "features/slices/stories";
import React from "react";

type Props = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  onClick: () => void;
};

const Story: React.FC<Props> = ({ avatar, name, onClick }) => {
  return (
    <div
      id="single-story"
      onClick={onClick}
      className="h-14 w-14 flex flex-col items-center"
    >
      <img
        alt=""
        src={avatar}
        className="object-contain w-full h-full cursor-pointer
        rounded-full border-2 border-[#894eff] p-[1.5px]
        transition duration-200 ease-out hover:scale-110"
      />
      <p className="text-[10px] text-gray-500">{name.substring(0, 5)}</p>
    </div>
  );
};

export default Story;
