import React from "react";
import { TUserAccountDetails } from "services/typings/user";

type Props = Omit<TUserAccountDetails, "_id">;

const UserStats = (props: Props) => {
  return (
    <div className="mt-4">
      <div>
        <div className="bg-gray-200 h-36 rounded-lg" />
        <div className="mx-4">
          <div className="flex items-end gap-x-4">
            <div className="w-32 h-32 -mt-14" id="profile-picture">
              <img
                alt="avatar"
                src={props?.profilePicture}
                className="w-full h-full z-50 object-contain rounded-full"
              />
            </div>
            <div className="flex gap-x-20 items-center">
              <div id="user-name">
                <p className="text-lg font-semibold">{props?.name}</p>
                <p className="font-medium">@{props?.username}</p>
              </div>
              <div id="follow-details" className="flex gap-x-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
