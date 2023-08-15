import React from "react";
import useModal from "hooks/useModal";
import { useRouter } from "next/router";
import { MODAL_VIEWS } from "typings/app";
import { XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import UploadPost from "../home/posts/upload-post";
import SearchResult from "../navbar/search-results";
import ViewSinglePost from "../home/explore/view-single-post";

const ModalContainer = () => {
  const router = useRouter();
  const { view, isOpen, closeModal } = useModal();

  function renderModalContent(view: MODAL_VIEWS | string) {
    switch (view) {
      case MODAL_VIEWS.UPLOAD_POST:
        return <UploadPost />;
      case MODAL_VIEWS.SEARCH_FOR_ARTIST:
        return <SearchResult />;
      case MODAL_VIEWS.VIEW_SINGLE_POST:
        return <ViewSinglePost />;
      default:
        return null;
    }
  }

  React.useEffect(() => {
    router.events.on("routeChangeStart", closeModal);
    return () => {
      router.events.off("routeChangeStart", closeModal);
    };
  }, []);

  return (
    <div data-testid="modal-container">
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          onClose={closeModal}
          className="fixed inset-0 z-50 h-screen w-screen overflow-hidden
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
            <XIcon className="w-12 h-12" onClick={closeModal} />
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
