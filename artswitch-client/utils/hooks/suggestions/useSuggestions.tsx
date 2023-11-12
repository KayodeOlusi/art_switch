import { useQuery } from "react-query";
import { TResponseBody } from "utils/services/typings/posts";
import { TSuggestion } from "utils/services/typings/suggestions";
import { getSuggestionsForUser } from "utils/services/user";

export const useGetSuggestions = () => {
  return useQuery<TResponseBody<TSuggestion[]>["data"], any>(
    "suggestions",
    getSuggestionsForUser
  );
};
