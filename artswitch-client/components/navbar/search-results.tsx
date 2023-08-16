import React from "react";
import useModal from "utils/hooks/useModal";
import { useRouter } from "next/router";
import { MODAL_VIEWS } from "utils/typings/app";
import { searchArtist } from "utils/services/user";
import useDebounce from "utils/hooks/useDebounce";
import { SpinnerLoader } from "../global/loader";
import { SearchIcon } from "@heroicons/react/solid";
import { TSearchUser } from "utils/services/typings/user";

type Props = {};

type TSearchResultProps = {
  data: TSearchUser["data"];
  loadingSearch: boolean;
  error: string;
};

const Loader = () => (
  <div className="w-full mx-auto text-center my-12">
    <SpinnerLoader size={30} color="#000" />
  </div>
);

const SearchResultItem = (artist: TSearchResultProps["data"][0]) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/user/${artist?.username}`)}
      className="flex items-center space-x-4 mb-4 rounded-lg cursor-pointer w-full 
    hover:bg-gray-200 hover:bg-opacity-50 p-3 transition-all duration-200"
    >
      <div className="w-10 h-10">
        <img
          alt="image"
          className="w-full h-full object-contain rounded-full"
          src={artist?.profilePicture || artist?.name[0]}
        />
      </div>
      <section
        className="flex flex-col space-y-0"
        onClick={() => router.push(`/user/${artist?.username}`)}
      >
        <p className="text-sm font-semibold">{artist?.name}</p>
        <p className="text-sm font-normal">@{artist?.username}</p>
      </section>
    </div>
  );
};

const SearchResult = (props: Props) => {
  const { data } = useModal();
  const [artistValue, setArtistValue] = React.useState(data?.searchValue);
  const { debouncedValue } = useDebounce({
    value: artistValue,
    delay: 1000,
  });
  const [searchResult, setSearchResult] = React.useState<TSearchResultProps>({
    data: [],
    error: "",
    loadingSearch: false,
  });

  const searchForArtist = React.useCallback(async (search: string) => {
    setSearchResult(prev => ({ ...prev, loadingSearch: true }));

    await searchArtist(
      search,
      res => {
        setSearchResult(prev => ({
          ...prev,
          data: res,
          loadingSearch: false,
        }));
      },
      () => setSearchResult(prev => ({ ...prev, loadingSearch: false }))
    );
  }, []);

  React.useEffect(() => {
    if (debouncedValue) searchForArtist(debouncedValue);
  }, [debouncedValue, searchForArtist]);

  return (
    <div
      id={MODAL_VIEWS.SEARCH_FOR_ARTIST}
      data-testid={MODAL_VIEWS.SEARCH_FOR_ARTIST}
      className="w-[500px] h-[400px] rounded-lg bg-white p-3 overflow-y-scroll"
    >
      <div className="relative w-full mb-3">
        <input
          type="text"
          value={artistValue}
          onChange={e => setArtistValue(e.target.value)}
          className="w-full rounded-lg h-11 pl-3 pr-10 border-[1px] text-sm"
        />
        <SearchIcon className="w-4 h-4 absolute right-2 top-[14px]" />
      </div>
      <div className="flex flex-col h-[320px] overflow-y-scroll">
        {searchResult.loadingSearch ? (
          <Loader />
        ) : searchResult.data?.length > 0 ? (
          searchResult.data?.map(artist => (
            <SearchResultItem key={artist._id} {...artist} />
          ))
        ) : (
          <p className="font-semibold text-sm opacity-50">
            Search for an artist
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
