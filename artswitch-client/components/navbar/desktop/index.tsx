import {
  CogIcon,
  UserIcon,
  SearchIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useRouter } from "next/router";
import useModal from "utils/hooks/useModal";
import { MODAL_VIEWS } from "utils/typings/app";
import { clearUserToken } from "utils/functions";
import { setModalData } from "features/slices/modal";
import { selectUserDetails } from "features/slices/user";
import MenuDropDown from "@/components/global/menu-dropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

type Props = {};

const DesktopNav = (props: Props) => {
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUserDetails);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const _signOutUser = async () => {
    clearUserToken();
    await router.push("/login");
    return router.reload();
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

  const searchForArtist = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchValue.length) return;
    e.key === "Enter" &&
      (() => {
        dispatch(setModalData({ searchValue }));
        openModal(MODAL_VIEWS.VIEW_ARTIST_PROFILE);
      })();
  };

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
