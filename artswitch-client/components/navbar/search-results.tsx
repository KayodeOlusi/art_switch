import React from "react";
import useModal from "hooks/useModal";
import { MODAL_VIEWS } from "typings/app";
import { searchArtist } from "services/user";
import useDebounce from "hooks/useDebounce";
import { SearchIcon } from "@heroicons/react/solid";
import { TSearchUser } from "services/typings/user";
import { SpinnerLoader } from "../global/loader";

type Props = {};

type TSearchResultProps = {
  data: TSearchUser["data"];
  loadingSearch: boolean;
  error: string;
};

const SearchResult = (props: Props) => {
  const { data } = useModal();
  const [artistValue, setArtistValue] = React.useState(data?.searchValue);
  const { debouncedValue } = useDebounce({
    value: artistValue,
    delay: 2000,
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
      className="w-[500px] rounded-lg bg-white p-3 overflow-y-scroll"
    >
      <div className="relative w-full">
        <input
          type="text"
          value={artistValue}
          onChange={e => setArtistValue(e.target.value)}
          className="w-full rounded-lg h-11 pl-3 pr-10"
        />
        <SearchIcon className="w-4 h-4 absolute right-2 top-[14px]" />
      </div>
      <div>
        {searchResult.loadingSearch ? (
          <SpinnerLoader size={30} color="#000" />
        ) : searchResult.data.length > 0 ? (
          searchResult.data.map(artist => <></>)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
