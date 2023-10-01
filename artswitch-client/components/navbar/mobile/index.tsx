import {
  HomeIcon,
  UserIcon,
  ChatAlt2Icon,
  PlusCircleIcon,
  GlobeIcon,
} from "@heroicons/react/outline";
import { useAppSelector } from "app/hooks";
import { selectUserDetails } from "features/slices/user";
import { useRouter } from "next/router";
import React from "react";
import useAppState from "utils/hooks/useAppState";
import useModal from "utils/hooks/useModal";
import { MODAL_VIEWS } from "utils/typings/app";

type Props = {};

const MobileNav: React.FC = (props: Props) => {
  const {
    chat: { open },
    setAppChatOpenState,
  } = useAppState();
  const {
    user: { username },
  } = useAppSelector(selectUserDetails);
  const router = useRouter();
  const { openModal } = useModal();

  const routeTo = (path: string) => router.push(path);

  return (
    <div
      className="flex bg-white w-full md:hidden fixed z-10
      bottom-0 py-3 px-2 justify-between"
    >
      <HomeIcon className="mobile-icons" onClick={() => routeTo("/")} />
      <GlobeIcon
        className="mobile-icons"
        onClick={() => openModal(MODAL_VIEWS.EXPLORE_POSTS)}
      />
      <PlusCircleIcon
        className="mobile-icons"
        onClick={() => openModal(MODAL_VIEWS.UPLOAD_POST)}
      />
      <ChatAlt2Icon
        className="mobile-icons"
        onClick={() => openModal(MODAL_VIEWS.VIEW_CHATS)}
      />
      <UserIcon
        className="mobile-icons"
        onClick={() => routeTo(`/user/${username}`)}
      />
    </div>
  );
};

export default MobileNav;
