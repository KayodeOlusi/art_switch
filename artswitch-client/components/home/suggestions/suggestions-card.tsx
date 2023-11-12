import React from "react";

type Props = {
  user: TSuggestion;
  onClick?: () => void;
};

const SuggestionCard = ({ user, onClick }: Props) => {
  return (
    <div
      id="suggestion-card"
      onClick={onClick}
      className="flex cursor-pointer items-start space-x-4 mb-4 rounded-lg w-full
    hover:bg-gray-200 hover:bg-opacity-50 p-2 transition-all duration-200"
    >
      <div className="">
        <div className="w-10 h-10">
          <img
            alt={`suggestion-image-${user.username}`}
            className="w-full h-full object-cover rounded-full"
            src={user?.profilePicture}
          />
        </div>
      </div>
      <section className="flex flex-col space-y-0 w-full">
        <div className="flex items-center justify-between gap-x-4">
          <p className="text-sm font-semibold">
            {user?.name?.length > 20
              ? user?.name.substring(0, 20) + "..."
              : user?.name}
          </p>
        </div>
        <p className="text-xs truncate font-normal" id="chat-message">
          @{user?.username}
        </p>
      </section>
    </div>
  );
};

export default SuggestionCard;
