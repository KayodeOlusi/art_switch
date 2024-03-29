import React from "react";
import { useRouter } from "next/router";
import useModal from "utils/hooks/useModal";
import { MODAL_VIEWS } from "utils/typings/app";
import { XIcon } from "@heroicons/react/solid";
import UploadPost from "../home/posts/upload-post";
import useViewPort from "utils/hooks/useViewport";
import SearchResult from "../navbar/search-results";
import { Dialog, Transition } from "@headlessui/react";
import { StoriesState } from "features/slices/stories";
import ViewSinglePost from "../home/explore/view-single-post";
import ViewSingleStory from "../home/posts/view-single-story";
import ExploreContainer from "../containers/home/explore-container";
import MessagesContainer from "../containers/home/messages-container";
import SuggestionsContainer from "../containers/home/suggestions-container";

const ModalContainer = () => {
  const router = useRouter();
  const {
    view,
    data,
    isOpen,
    openModal,
    isExplore,
    closeModal,
    setIsExploreOpen,
  } = useModal();
  const viewPort = useViewPort();

  function renderModalContent(view: MODAL_VIEWS | string) {
    switch (view) {
      case MODAL_VIEWS.UPLOAD_POST:
        return <UploadPost />;
      case MODAL_VIEWS.VIEW_ARTIST_PROFILE:
        return <SearchResult action="view-profile" />;
      case MODAL_VIEWS.CREATE_CHAT_WITH_ARTIST:
        return <SearchResult action="create-chat" />;
      case MODAL_VIEWS.VIEW_SINGLE_POST:
        return <ViewSinglePost />;
      case MODAL_VIEWS.VIEW_CHATS:
        return <MessagesContainer />;
      case MODAL_VIEWS.EXPLORE_POSTS:
        return <ExploreContainer />;
      case MODAL_VIEWS.VIEW_SUGGESTIONS:
        return <SuggestionsContainer />;
      case MODAL_VIEWS.VIEW_STORY:
        return <ViewSingleStory data={data as StoriesState["stories"][0]} />;
      default:
        return null;
    }
  }

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsExploreOpen?.({ open: false, tag: "" });
      closeModal();
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        setIsExploreOpen?.({ open: false, tag: "" });
        closeModal();
      });
    };
  }, []);

  return (
    <div data-testid="modal-container" className="overflow-hidden">
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            if (isExplore?.open && viewPort < 768) {
              openModal(MODAL_VIEWS.EXPLORE_POSTS);
            } else {
              setIsExploreOpen?.({ open: false, tag: "" });
              closeModal();
            }
          }}
          className="fixed inset-0 z-50 h-[100svh] w-screen overflow-y-hidden
         p-0 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 z-40 cursor-pointer
          bg-gray-700 bg-opacity-60 backdrop-blur"
            />
          </Transition.Child>

          <div className="sr-only">
            <XIcon
              className="w-12 h-12"
              onClick={() => {
                if (isExplore?.open)
                  setIsExploreOpen?.({ open: false, tag: "" });
                closeModal();
              }}
            />
          </div>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-105"
          >
            <div
              className="absolute bottom-0 sm:relative z-50 inline-block
              w-full text-left left-0 sm:align-middle sm:w-auto"
            >
              {view && renderModalContent(view)}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalContainer;
