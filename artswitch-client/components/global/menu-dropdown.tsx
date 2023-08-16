import React from "react";
import { Menu, Transition } from "@headlessui/react";

type Props = {
  DisplayContent: React.ReactNode;
  containerClass?: string;
  items: Array<{
    Icon?: React.FC;
    text: string;
    action: () => void;
  }>;
};

const MenuDropDown = ({ DisplayContent, containerClass, items }: Props) => {
  return (
    <div className={containerClass}>
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button>{DisplayContent}</Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-56 origin-top-right
            divide-y divide-gray-100 rounded-md bg-white shadow-lg 
            ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {items.map((item, idx) => (
              <div className="px-1 py-1" key={idx}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={item.action}
                      className={`${
                        active ? "bg-gray-200 text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 font-semibold py-2 text-sm`}
                    >
                      {item.Icon && (
                        <span className="mr-3">
                          <item.Icon />
                        </span>
                      )}
                      {item.text}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuDropDown;
