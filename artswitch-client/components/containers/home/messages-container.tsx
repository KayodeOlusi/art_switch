import React from "react";
import { useAppSelector } from "app/hooks";
import useModal from "utils/hooks/useModal";
import { MODAL_VIEWS } from "utils/typings/app";
import AppLoader from "@/components/global/loader";
import useAppState from "utils/hooks/useAppState";
import { PencilAltIcon } from "@heroicons/react/outline";
import { useGetChats } from "utils/hooks/chats/useChats";
import { selectUserDetails } from "features/slices/user";
import { TGetAllUserChats } from "utils/services/typings/chats";
import MessageProfileCard from "@/components/home/messages/message-profile-card";

type Props = {};

const MessagesContainer = (props: Props) => {
  const {
    setAppChatData,
    toggleFetchMessage,
    setAppChatOpenState,
    toggleRefetchMessages,
  } = useAppState();
  const {
    user: { _id },
  } = useAppSelector(selectUserDetails);
  const { openModal, isOpen, closeModal } = useModal();
  const { data, error, isLoading } = useGetChats(_id, toggleFetchMessage);

  const handleChatClick = React.useCallback((chat: TGetAllUserChats) => {
    if (isOpen) closeModal();

    toggleRefetchMessages(true);
    setAppChatData(chat);
    setAppChatOpenState(true);

    setTimeout(() => {
      toggleRefetchMessages(false);
    }, 2000);
  }, []);

  return (
    <div
      className="bg-white rounded-lg px-4 py-4 h-[90vh] 
      overflow-y-scroll sm:w-96 sm:h-80 md:w-auto md:h-72 lg:h-64 xl:h-96"
    >
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Messages</h3>
        <PencilAltIcon
          id="create-chat"
          className="w-6 h-6 cursor-pointer"
          onClick={() => openModal(MODAL_VIEWS.CREATE_CHAT_WITH_ARTIST)}
        />
      </section>
      <div className="mt-6" id="chat-container">
        {isLoading && !error && (
          <div className="flex items-center justify-center">
            <AppLoader role="progressbar" size={20} color="#000000" />
          </div>
        )}
        {error && (
          <div className="text-center" role="alert">
            {error?.message}
          </div>
        )}
        {data &&
          !error &&
          !isLoading &&
          (() =>
            data.length > 0 ? (
              data.map(chat => (
                <MessageProfileCard
                  key={chat._id}
                  chat={chat}
                  onClick={() => handleChatClick(chat)}
                />
              ))
            ) : (
              <div className="text-center text-sm">No messages yet</div>
            ))()}
      </div>
    </div>
  );
};

export default MessagesContainer;
