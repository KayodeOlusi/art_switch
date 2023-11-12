import React from "react";
import { useAppSelector } from "app/hooks";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { editProfilePicture, followOperation } from "utils/services/user";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { selectUserDetails } from "features/slices/user";
import { TUserAccountDetails } from "utils/services/typings/user";
import { useQueryClient } from "react-query";
import { PencilIcon } from "@heroicons/react/solid";
import { errorMessage } from "utils/services/client";

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
  const queryClient = useQueryClient();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followingUser, setFollowingUser] = React.useState(
    props?.["follow-details"]?.followers?.includes(_id)
  );

  React.useEffect(() => {
    setFollowingUser(props?.["follow-details"]?.followers?.includes(_id));
  }, [props]);

  const refetchUserDetails = async () => {
    await queryClient.refetchQueries(`user-${props?.username}`);
  };

  const followAction = async () => {
    setLoading(true);

    let data: FollowOperationData = {
      follow_id: props?._id,
      action: followingUser ? "unfollow" : "follow",
    };

    switch (followingUser) {
      case true:
        data.action = "unfollow";
        await followOperation(data, async () => {
          await refetchUserDetails();
          setLoading(false);
        });
        break;
      case false:
        data.action = "follow";
        await followOperation(data, async () => {
          await refetchUserDetails();
          setLoading(false);
        });
        break;
      default:
        break;
    }
  };

  const changeProfilePicture = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadNotification = toast.loading("Uploading...");

    const reader = new FileReader();
    const maxSize = 1024 * 1024 * 2;

    if (e.target.files && e.target.files[0].size > maxSize) {
      return errorMessage("Image size is too large");
    }

    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
      await editProfilePicture(
        readerEvent.target?.result as string,
        async () => {
          await refetchUserDetails();
          toast.success("Updated Successfully", {
            id: uploadNotification,
          });
        }
      );
    };
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
            <div className="w-32 h-32 -mt-14 relative" id="profile-picture">
              <img
                alt="avatar"
                role="img"
                src={props?.profilePicture}
                className="w-full h-full z-50 object-cover rounded-full"
              />
              {props?._id === _id && (
                <div
                  className="absolute right-0 bottom-5 bg-gray-200 rounded-full p-1 cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  <PencilIcon className="w-4 h-4 text-gray-500" />
                </div>
              )}
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
      <input
        hidden
        type="file"
        accept="image/*"
        ref={fileRef}
        id="profile-picture-input"
        onChange={changeProfilePicture}
      />
    </div>
  );
};

export default UserStats;
