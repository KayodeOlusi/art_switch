import React from "react";

type Props = {
  tag: string;
  activeTag: string;
  setActiveTag: React.Dispatch<React.SetStateAction<string>>;
  onTagClick?: (tag: string) => void;
};

const Tag = ({ tag, activeTag, setActiveTag, onTagClick }: Props) => {
  return (
    <p
      onClick={() => {
        onTagClick?.(tag);
        setActiveTag(tag);
      }}
      className={`rounded-xl cursor-pointer px-2 py-2 text-[#545966] text-xs capitalize ${
        activeTag == tag && "bg-appPrimary"
      }`}
    >
      {tag}
    </p>
  );
};

export default Tag;
