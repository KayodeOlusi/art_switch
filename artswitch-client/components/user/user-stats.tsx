import React from "react";
import { useAppSelector } from "app/hooks";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import { followOperation } from "utils/services/user";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { selectUserDetails } from "features/slices/user";
import { TUserAccountDetails } from "utils/services/typings/user";

type Props = TUserAccountDetails;

export type FollowOperationData = {
  follow_id: string;
  action: "follow" | "unfollow";
};

const UserStats = (props: Props) => {
  const {
    user: { _id },
  } = useAppSelector(selectUserDetails);
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followingUser, setFollowingUser] = React.useState(
    props?.["follow-details"]?.followers?.includes(_id)
  );

  React.useEffect(() => {
    setFollowingUser(props?.["follow-details"]?.followers?.includes(_id));
  }, [props]);

  const followAction = async () => {
    setLoading(true);
    let data: FollowOperationData = {
      follow_id: props?._id,
      action: followingUser ? "unfollow" : "follow",
    };

    switch (followingUser) {
      case true:
        data.action = "unfollow";
        await followOperation(data, () => {
          setLoading(false);
          return router.replace(router.asPath);
        });
        break;
      case false:
        data.action = "follow";
        await followOperation(data, () => {
          setLoading(false);
          return router.replace(router.asPath);
        });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="mt-4"
      key={Number(followingUser)}
      data-testid="user-stats-container"
    >
      <div>
        <div className="bg-gray-200 h-36 rounded-lg" />
        <div className="mx-6">
          <div className="flex items-center gap-x-4">
            <div className="w-32 h-32 -mt-14" id="profile-picture">
              <img
                alt="avatar"
                role="img"
                src={props?.profilePicture}
                className="w-full h-full z-50 object-contain rounded-full"
              />
            </div>
            {props?._id !== _id && followingUser ? (
              <span
                className="border-[1px] border-green-600 rounded-lg px-3 py-1
                flex items-center gap-x-2 w-fit -mt-4"
              >
                <p className="inline-block text-sm text-green-600 font-medium">
                  Following
                </p>
                <BadgeCheckIcon className="w-5 h-5 text-green-600" />
              </span>
            ) : null}
          </div>
          <div className="flex flex-col md:flex-row gap-y-4 gap-x-20 items-start mt-4">
            <div id="user-name" className="flex flex-col gap-y-1">
              <p className="text-lg font-semibold">{props?.name}</p>
              <p className="font-medium">@{props?.username}</p>
            </div>
            <div
              className="flex items-end md:items-start justify-between
              md:justify-start md:gap-x-20 w-full"
            >
              <div id="follow-details" className="flex gap-x-8">
                <div id="followers">
                  <p className="font-semibold">Followers</p>
                  <p className="font-bold">
                    {props?.["follow-details"]?.followers?.length}
                  </p>
                </div>
                <div id="following">
                  <p className="font-semibold">Following</p>
                  <p className="font-bold">
                    {props?.["follow-details"]?.following?.length}
                  </p>
                </div>
              </div>
              <div id="follow-button">
                {props?._id !== _id && (
                  <button
                    onClick={followAction}
                    className="bg-gray-200 text-sm font-medium 
                  cursor-pointer px-3 py-1 rounded-lg"
                  >
                    {loading ? (
                      <ClipLoader size={15} color="#000000" />
                    ) : followingUser ? (
                      "Unfollow"
                    ) : (
                      "Follow"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
