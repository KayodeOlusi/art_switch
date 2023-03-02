import React from "react";

type Props = {
  tag: string;
  activeTag: string;
  setActiveTag: React.Dispatch<React.SetStateAction<string>>;
};

const Tag = ({ tag, activeTag, setActiveTag }: Props) => {
  return (
    <p
      onClick={() => setActiveTag(tag)}
      className={`rounded-2xl cursor-pointer px-2 py-2 text-[#545966] text-sm ${
        activeTag === tag ? "bg-red-300" : ""
      }}`}
    >
      {tag}
    </p>
  );
};

export default Tag;
