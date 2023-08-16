import React from "react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { TUserAccountDetails } from "utils/services/typings/user";

type Props = TUserAccountDetails;

const UserStats = (props: Props) => {
  return (
    <div className="mt-4">
      <div>
        <div className="bg-gray-200 h-36 rounded-lg" />
        <div className="mx-6">
          <div className="flex items-end gap-x-4">
            <div className="w-32 h-32 -mt-14" id="profile-picture">
              <img
                alt="avatar"
                src={props?.profilePicture}
                className="w-full h-full z-50 object-contain rounded-full"
              />
            </div>
          </div>
          <div className="flex gap-x-20 items-start mt-4">
            <div id="user-name" className="flex flex-col gap-y-1">
              <p className="text-lg font-semibold">{props?.name}</p>
              <p className="font-medium">@{props?.username}</p>
              {props?.["follow-details"]?.followers?.includes(props?._id) ? (
                <span
                  className="border-[1px] border-green-600 rounded-lg px-3 py-1
                  flex items-center gap-x-2 w-fit"
                >
                  <p className="inline-block text-sm text-green-600 font-medium">
                    Following
                  </p>
                  <BadgeCheckIcon className="w-5 h-5 text-green-600" />
                </span>
              ) : null}
            </div>
            <div id="follow-details" className="flex gap-x-8">
              <div>
                <p className="font-semibold">Followers</p>
                <p className="font-bold">
                  {props?.["follow-details"]?.followers?.length}
                </p>
              </div>
              <div>
                <p className="font-semibold">Following</p>
                <p className="font-bold">
                  {props?.["follow-details"]?.following?.length}
                </p>
              </div>
            </div>
            <div className="" id="follow-button">
              {props?.["follow-details"]?.followers?.includes(props?._id) ? (
                <button
                  className="bg-gray-200 text-sm font-medium 
                  cursor-pointer px-3 py-1 rounded-lg"
                >
                  {props?.["follow-details"]?.followers?.includes(props?._id)
                    ? "Follow"
                    : "Unfollow"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
