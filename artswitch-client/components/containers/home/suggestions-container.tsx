import React from "react";
import { useRouter } from "next/router";
import AppLoader from "@/components/global/loader";
import SuggestionCard from "@/components/home/suggestions/suggestions-card";
import { useGetSuggestions } from "utils/hooks/suggestions/useSuggestions";
import { XIcon } from "@heroicons/react/solid";
import useModal from "utils/hooks/useModal";

type Props = {};

const SuggestionsContainer = (props: Props) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const { data, error, isLoading } = useGetSuggestions();

  return (
    <div
      className="bg-white rounded-none h-[100svh] sm:rounded-lg px-4 py-4
      overflow-y-scroll md:h-72 lg:h-64 xl:h-96 sm:w-96 sm:h-80 md:w-auto"
    >
      <section className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="font-bold">Suggestions</h3>
          <p className="text-xs text-secondaryText">
            Artist suggestions for you
          </p>
        </div>
        <div className="flex md:hidden justify-end mb-6 md:mb-0">
          <XIcon className="w-4 h-4 cursor-pointer" onClick={closeModal} />
        </div>
      </section>

      <div className="mt-6" id="suggestions-container">
        {isLoading && !error && (
          <div className="flex items-center justify-center">
            <AppLoader role="progressbar" size={20} color="#000000" />
          </div>
        )}
        {error && (
          <div className="text-center text-sm" role="alert">
            Could not load data. Try again later.
          </div>
        )}
        {data &&
          !error &&
          !isLoading &&
          (() =>
            data.length > 0 ? (
              data.map(user => (
                <SuggestionCard
                  key={user._id}
                  user={user}
                  onClick={() => router.push(`/user/${user.username}`)}
                />
              ))
            ) : (
              <div className="text-center text-sm">No users to follow yet</div>
            ))()}
      </div>
    </div>
  );
};

export default SuggestionsContainer;
