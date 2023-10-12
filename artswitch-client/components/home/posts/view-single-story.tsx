import { StoriesState } from "features/slices/stories";
import React from "react";

type Props = {
  data: StoriesState["stories"][0];
};

const ViewSingleStory = ({ data }: Props) => {
  return (
    <div
      className="w-screen h-fit sm:w-[400px] sm:h-fit rounded-lg
       bg-white p-3 overflow-y-scroll"
    >
      <h2 className="text-lg font-semibold">{data?.name}</h2>
      <p className="mb-9 font-medium text-sm opacity-50">{data?.email}</p>
      <div className="w-full h-80 rounded-lg">
        <img
          alt="Post Image"
          src={data?.avatar}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ViewSingleStory;
