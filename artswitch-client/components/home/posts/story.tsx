import React from "react";

type Props = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

const Story: React.FC<Props> = ({ avatar, email, id, name }) => {
  return (
    <img
      alt=""
      src={avatar}
      className="object-contain h-14 w-14 cursor-pointer
        rounded-full border-2 border-[#894eff] p-[1.5px]
        transition duration-200 ease-out hover:scale-110"
    />
  );
};

export default Story;
