import React from "react";
import { postTags } from "utils/data";
import useModal from "utils/hooks/useModal";
import Tag from "@/components/home/explore/tag";
import { MODAL_VIEWS } from "utils/typings/app";
import { TPost } from "utils/services/typings/posts";
import AppLoader from "@/components/global/loader";
import { useGetPostsByTag } from "utils/hooks/posts/usePosts";
import { XIcon } from "@heroicons/react/solid";

type Props = {};

const ExploreContainer = (props: Props) => {
  const {
    openModal,
    isExplore,
    closeModal,
    setModalViewData,
    setIsExploreOpen,
  } = useModal();
  const [activeTag, setActiveTag] = React.useState(
    isExplore.tag || postTags[0]
  );
  const { data, error, isLoading } = useGetPostsByTag(activeTag);

  const openModalToViewPost = (data: TPost) => {
    setModalViewData(data);
    openModal(MODAL_VIEWS.VIEW_SINGLE_POST);
  };

  const allTagPosts = React.useMemo(() => {
    if (data?.data) {
      const posts = data.data.reduce((acc: TPost[][], post, index) => {
        if (index % 3 === 0) {
          acc.push([post]);
        } else {
          acc[acc.length - 1].push(post);
        }

        return acc;
      }, []);

      return posts;
    }

    return [];
  }, [data]);

  return (
    <div
      className="bg-white mt-3 rounded-none lg:rounded-lg px-4
       py-4 md:h-72 lg:h-64 xl:h-96 h-[100svh] overflow-y-scroll sm:w-96 sm:h-80 md:w-auto"
    >
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Explore</h3>
        <XIcon
          onClick={() => {
            setIsExploreOpen({ open: false, tag: "" });
            closeModal();
          }}
          className="md:hidden w-4 h-4 cursor-pointer"
        />
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
            onTagClick={(tag: string) => setIsExploreOpen({ tag })}
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

      {!isLoading && !error && (
        <section className="mt-6 h-full md:h-[244px] overflow-y-scroll scrollbar-hide">
          <div
            data-testid="post-container"
            className="grid grid-cols-2 md:grid-cols-2 gap-2"
          >
            {allTagPosts?.map((postArr, idx) => (
              <div className="grid gap-2" key={idx} data-testid="post-card">
                {postArr?.map(post => (
                  <div
                    key={post._id}
                    className="cursor-pointer"
                    onClick={() => openModalToViewPost(post)}
                  >
                    <img
                      alt="image"
                      src={post?.image}
                      className="h-auto max-w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExploreContainer;
