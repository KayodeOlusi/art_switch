import React from "react";
import useModal from "utils/hooks/useModal";
import { PencilAltIcon } from "@heroicons/react/outline";
import { MODAL_VIEWS } from "utils/typings/app";

type Props = {};

const MessagesContainer = (props: Props) => {
  const { openModal } = useModal();

  return (
    <div className="bg-white rounded-lg px-4 py-4 md:h-72 lg:h-64 xl:h-96">
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Messages</h3>
        <PencilAltIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => openModal(MODAL_VIEWS.CREATE_CHAT_WITH_ARTIST)}
        />
      </section>
    </div>
  );
};

export default MessagesContainer;
