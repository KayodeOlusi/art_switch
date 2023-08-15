import { PhotographIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {};

const SkeletonLoader = (props: Props) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-12 justify-between">
      <div
        className="animate-pulse flex items-center justify-center
       w-full h-full bg-gray-400 border-[1px] border-gray-400 
       rounded-lg overflow-y-scroll"
      >
        <div>
          <PhotographIcon className="w-9 h-9" />
        </div>
      </div>
      <div className="animate-pulse flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <div className="w-9 h-9 rounded-full animate-pulse bg-gray-400" />
          <div className="w-9 h-9 rounded-full animate-pulse bg-gray-400" />
        </div>
        <div className="rounded-lg bg-gray-400 w-full h-4" />
        <div className="rounded-lg bg-gray-400 w-full h-4" />
        <div className="rounded-lg bg-gray-400 w-full h-4" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
