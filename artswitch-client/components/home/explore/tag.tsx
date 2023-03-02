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
      className={`rounded-xl cursor-pointer px-2 py-2 text-[#545966] text-xs ${
        activeTag == tag && "bg-appPrimary"
      }`}
    >
      {tag}
    </p>
  );
};

export default Tag;
