import {
  CogIcon,
  UserIcon,
  SearchIcon,
  ChatAlt2Icon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useRouter } from "next/router";
import useModal from "hooks/useModal";
import { MODAL_VIEWS } from "typings/app";
import { setModalData } from "features/slices/modal";
import { useAppDispatch } from "../../../app/hooks";

type Props = {};

const DesktopNav = (props: Props) => {
  const router = useRouter();
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = React.useState<string>("");

  const searchForArtist = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchValue.length) return;
    e.key === "Enter" &&
      (() => {
        dispatch(setModalData({ searchValue }));
        openModal(MODAL_VIEWS.SEARCH_FOR_ARTIST);
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
          <CogIcon className="w-7 h-7 cursor-pointer" />
          <UserIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
