import React from "react";
import { XIcon } from "@heroicons/react/solid";
import useAppState from "utils/hooks/useAppState";

type Props = {};

const ChatWidget = (props: Props) => {
  const {
    chat: { data },
    setAppChatOpenState,
  } = useAppState();

  return (
    <div className="p-3">
      <section className="flex justify-end">
        <XIcon
          className="w-4 h-4 cursor-pointer"
          onClick={() => setAppChatOpenState(false)}
        />
      </section>
    </div>
  );
};

export default ChatWidget;
