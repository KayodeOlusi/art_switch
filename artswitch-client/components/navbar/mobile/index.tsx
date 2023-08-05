import {
  HomeIcon,
  CogIcon,
  UserIcon,
  ChatAlt2Icon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { FC } from "react";

type Props = {};

const MobileNav: FC = (props: Props) => {
  return (
    <div className="flex bg-white w-full md:hidden fixed z-10 bottom-0 py-3 px-2 justify-between">
      <HomeIcon className="mobile-icons" />
      <PlusCircleIcon className="mobile-icons" />
      <ChatAlt2Icon className="mobile-icons" />
      <UserIcon className="mobile-icons" />
    </div>
  );
};

export default MobileNav;
