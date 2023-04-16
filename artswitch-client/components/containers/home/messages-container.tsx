import { PencilAltIcon, PencilIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {};

const MessagesContainer = (props: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-4 md:h-72 lg:h-96">
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Messages</h3>
        <PencilAltIcon className="w-6 h-6 cursor-pointer" />
      </section>
    </div>
  );
};

export default MessagesContainer;
