import {
  ChatAlt2Icon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { FC } from "react";

type Props = {};

const MobileNav: FC = (props: Props) => {
  return (
    <div className="flex bg-white w-full md:hidden fixed z-10 bottom-0 py-3 px-2 justify-between">
      <HomeIcon className="w-8 h-8" />
      <PlusCircleIcon className="w-8 h-8" />
      <ChatAlt2Icon className="w-8 h-8" />
      <UserIcon className="w-8 h-8" />
    </div>
  );
};

export default MobileNav;
