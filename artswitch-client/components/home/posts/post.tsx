import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

type Props = {
  profileURL: string;
  name: string;
  location: string;
  postDetails: string;
};

const Post = (props: Props) => {
  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex items-center justify-between">
        <section className="flex items-center space-x-2">
          <img src="" alt="" />
          <section>
            <h4>{props.name}</h4>
            <p>{props.location}</p>
          </section>
        </section>
        <DotsHorizontalIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Post;
