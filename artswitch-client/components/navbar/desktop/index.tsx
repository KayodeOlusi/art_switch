import {
  CogIcon,
  UserIcon,
  SearchIcon,
  PlusCircleIcon,
  BellIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import React from "react";
import { socket } from "../../../socket";
import { useRouter } from "next/router";
import useModal from "utils/hooks/useModal";
import { MODAL_VIEWS } from "utils/typings/app";
import { clearUserToken, getUser } from "utils/functions";
import { setModalData } from "features/slices/modal";
import {
  removeNotification,
  selectUserDetails,
  setNotifications,
} from "features/slices/user";
import MenuDropDown from "@/components/global/menu-dropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import useAppState from "utils/hooks/useAppState";
import { TSingleMessage } from "utils/services/typings/messages";

type Props = {};

const DesktopNav = (props: Props) => {
  const {
    chat: { data },
    setAppChatData,
    setAppChatOpenState,
  } = useAppState();
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const { user, notifications } = useAppSelector(selectUserDetails);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const _signOutUser = async () => {
    clearUserToken();
    await router.push("/login");
    return router.reload();
  };

  const populateNotifications = (message: any) => {
    if (!data || data?.chat?._id !== message?.chat?.chat) {
      const notification = message as TSingleMessage;

      if (!notifications.includes(notification)) {
        dispatch(setNotifications(notification));
      }
    }
  };

  const settingsItems = React.useMemo(
    () => [
      {
        text: "Sign Out",
        action: _signOutUser,
      },
    ],
    []
  );

  const notificationsItems = React.useMemo(
    () =>
      notifications.length > 0
        ? notifications.map(notification => ({
            Icon: ChatIcon,
            text: `${getUser(
              user?._id,
              notification?.chat?.users
            )} sent a message`,
            action: () => {
              setAppChatData(notification.chat);
              setAppChatOpenState(true);
              dispatch(removeNotification(notification._id));
            },
          }))
        : [{ text: "No new notifications", action: () => {} }],
    [notifications]
  );

  const searchForArtist = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchValue.length) return;
    e.key === "Enter" &&
      (() => {
        dispatch(setModalData({ searchValue }));
        openModal(MODAL_VIEWS.VIEW_ARTIST_PROFILE);
      })();
  };

  React.useEffect(() => {
    socket.on(`message received ${user?._id}`, message =>
      populateNotifications(message)
    );

    return () => {
      socket.off(`message received ${user?._id}`);
    };
  });

  return (
    <div className="hidden md:block bg-white w-full rounded-bl-3xl rounded-br-3xl">
      <div
        className="md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 
        mx-auto flex justify-between items-center py-4"
      >
        <h3
          onClick={() => router.push("/")}
          className="font-bold text-lg cursor-pointer"
        >
          ArtSwitch
        </h3>
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-4 top-[0.5rem]" />
          <input
            type="text"
            value={searchValue}
            onKeyDown={searchForArtist}
            placeholder="Search for an artist"
            onChange={e => setSearchValue(e.target.value)}
            className="bg-appPrimary rounded-3xl w-96 px-12 py-2 text-sm focus:outline-black"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div
            className="nav-icons"
            onClick={() => openModal(MODAL_VIEWS.UPLOAD_POST)}
          >
            <PlusCircleIcon className="w-auto h-auto" />
          </div>
          <MenuDropDown
            containerClass="pt-2"
            items={notificationsItems}
            DisplayContent={
              <div className="nav-icons relative">
                <BellIcon
                  className={`w-auto h-auto ${
                    notifications.length > 0 && "animate-bounce"
                  }`}
                />
                {notifications.length > 0 && (
                  <div
                    className="absolute flex items-center justify-center bg-red-700 
                  rounded-full w-4 h-4 -top-1 -right-2 p-1 text-[8px] text-white"
                  >
                    {notifications.length}
                  </div>
                )}
              </div>
            }
          />
          <MenuDropDown
            items={settingsItems}
            containerClass="pt-2"
            DisplayContent={<CogIcon className="w-7 h-7 cursor-pointer" />}
          />
          <UserIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => router.push(`/user/${user?.username}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
