import {
  SearchIcon,
  ChatAlt2Icon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React, { FC } from "react";
import { useRouter } from "next/router";

type Props = {};

const DesktopNav: FC = (props: Props) => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>("");

  const searchUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!search.length) return;
    e.key === "Enter" && console.log(search);
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
            value={search}
            onKeyDown={searchUser}
            placeholder="Search for a user..."
            onChange={e => setSearch(e.target.value)}
            className="bg-[#f2f5f7] rounded-3xl w-96 px-12 py-2 text-sm focus:outline-black"
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-9 h-9 rounded-full bg-[#f2f5f7] p-2">
            <PlusCircleIcon className="w-auto h-auto cursor-pointer" />
          </div>
          <div className="w-9 h-9 rounded-full bg-[#f2f5f7] p-2">
            <ChatAlt2Icon className="w-auto h-auto cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
