import Tag from "@/components/home/explore/tag";
import React from "react";

type Props = {};

const ExploreContainer = (props: Props) => {
  const [activeTag, setActiveTag] = React.useState("Product" as string);
  const tags = ["Product", "Art", "Life", "Design", "Tech", "Music", "Food"];

  return (
    <div className="bg-white rounded-lg px-4 py-4 md:h-72 lg:h-96">
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Explore</h3>
        <p className="text-secondaryText text-sm">See all</p>
      </section>

      <section className="overflow-x-scroll flex space-x-3 items-center">
        {tags.map(tag => (
          <Tag
            key={tag}
            tag={tag}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        ))}
      </section>
    </div>
  );
};

export default ExploreContainer;
