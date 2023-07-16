import React from "react";
import Tag from "@/components/home/explore/tag";
import { useGetPostsByTag } from "hooks/posts/usePosts";
import { postTags } from "utils/data";
import AppLoader from "@/components/global/loader";

type Props = {};

const ExploreContainer = (props: Props) => {
  const [activeTag, setActiveTag] = React.useState(postTags[0]);
  const { data, error, isLoading } = useGetPostsByTag(activeTag);

  return (
    <div className="bg-white mt-3 rounded-lg px-4 py-4 md:h-72 lg:h-64 xl:h-96">
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Explore</h3>
        <p className="text-secondaryText cursor-pointer text-sm">See all</p>
      </section>

      <section
        data-testid="tag-container"
        className="overflow-x-scroll flex space-x-3 mt-4 scrollbar-none
        scrollbar-thumb-transparent items-center"
      >
        {postTags.map(tag => (
          <Tag
            key={tag}
            tag={tag}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        ))}
      </section>

      <section>
        {isLoading && (
          <span
            className="w-full flex items-center justify-center mt-12"
            data-testid="app-loader"
          >
            <AppLoader color="#DDDDDD" size={10} />
          </span>
        )}
        {error && (
          <p role="alert" className="text-center mt-6 text-xs opacity-50">
            There was an error getting the posts. Please try again.
          </p>
        )}
      </section>
    </div>
  );
};

export default ExploreContainer;
