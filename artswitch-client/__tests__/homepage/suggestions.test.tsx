jest.mock("../../utils/hooks/suggestions/useSuggestions");

import {
  click,
  elementById,
  roleElement,
  textElement,
  queryImageElement,
} from "utils/lib/test-helpers";
import { getTestLayout } from "utils/lib/wrappers";
import { testSuggestionsData } from "utils/data";
import { cleanup, render } from "@testing-library/react";
import { useGetSuggestions } from "utils/hooks/suggestions/useSuggestions";
import SuggestionCard from "@/components/home/suggestions/suggestions-card";
import SuggestionsContainer from "@/components/containers/home/suggestions-container";

describe("Message Container", () => {
  const mockedUseGetSuggestions = useGetSuggestions as jest.MockedFunction<any>;

  beforeEach(() => {
    mockedUseGetSuggestions.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe("Message Container UI", () => {
    it("should show the suggestions header", () => {
      const element = getTestLayout(<SuggestionsContainer />, "react-query");

      render(element);
      const messageHeader = textElement("Suggestions");

      expect(messageHeader).toBeInTheDocument();
      expect(messageHeader.textContent).toBe("Suggestions");
    });

    it("should show the suggestions subheader", () => {
      const element = getTestLayout(
        <SuggestionsContainer />,
        "redux-react-query"
      );

      render(element);
      const subHeader = textElement("Artist suggestions for you");

      expect(subHeader).toBeInTheDocument();
      expect(subHeader).toHaveTextContent("Artist suggestions for you");
    });
  });

  describe("Message Container Functionality", () => {
    it("should show an error message when there is an error fetching all suggestions", () => {
      mockedUseGetSuggestions.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: { message: "Error fetching data" },
      });

      const element = getTestLayout(<SuggestionsContainer />, "react-query");
      render(element);

      const errorMessage = roleElement("alert");

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.textContent).toBe(
        "Could not load data. Try again later."
      );
    });

    it("should show the loader when fetching all suggestions", () => {
      mockedUseGetSuggestions.mockReturnValueOnce({
        data: [],
        isLoading: true,
        error: null,
      });

      const element = getTestLayout(<SuggestionsContainer />, "react-query");
      render(element);

      const loader = roleElement("progressbar");
      expect(loader).toBeInTheDocument();
    });

    it("should show the text for no messages when a user has no suggestions", () => {
      mockedUseGetSuggestions.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: null,
      });

      const element = getTestLayout(<SuggestionsContainer />, "react-query");
      render(element);

      const noSuggestions = textElement("No users to follow yet");

      expect(noSuggestions).toBeInTheDocument();
      expect(noSuggestions.textContent).toBe("No users to follow yet");
    });

    const itShouldRenderTheRightAmountOfSuggestionsCard = ({
      totalSuggestions,
      expectedVal,
    }: {
      totalSuggestions: number;
      expectedVal: number;
    }) =>
      it("should render the right amount of suggestions card based on total number of data from API", () => {
        mockedUseGetSuggestions.mockReturnValueOnce({
          data: testSuggestionsData.slice(totalSuggestions),
          isLoading: false,
          error: null,
        });

        const element = getTestLayout(<SuggestionsContainer />, "react-query");
        render(element);
        const suggestionsContainer = elementById("suggestions-container");

        expect(suggestionsContainer?.children.length).toBe(expectedVal);
      });

    itShouldRenderTheRightAmountOfSuggestionsCard({
      totalSuggestions: 0,
      expectedVal: 4,
    });
    itShouldRenderTheRightAmountOfSuggestionsCard({
      totalSuggestions: 1,
      expectedVal: 3,
    });
  });

  describe("Message Profile Card UI", () => {
    const itShouldShowTheCorrectNameOfUser = ({
      dataIdx,
    }: {
      dataIdx: number;
    }) =>
      it("should show the name of the chat", () => {
        const handleSuggestionClick = jest.fn();

        const element = getTestLayout(
          <SuggestionCard
            user={testSuggestionsData[dataIdx]}
            onClick={handleSuggestionClick}
          />
        );
        render(element);

        const suggestionName = textElement(testSuggestionsData[dataIdx].name);

        expect(suggestionName).toBeInTheDocument();
        expect(suggestionName).toHaveTextContent(
          testSuggestionsData[dataIdx].name
        );
      });

    const itShouldShowTheCorrectProfilePictureOfSuggestion = ({
      dataIdx,
    }: {
      dataIdx: number;
    }) =>
      it("should show the profile picture of the suggestion", () => {
        const handleSuggestionClick = jest.fn();

        const element = getTestLayout(
          <SuggestionCard
            user={testSuggestionsData[dataIdx]}
            onClick={handleSuggestionClick}
          />
        );
        render(element);

        const suggestionImage = queryImageElement(
          `suggestion-image-${testSuggestionsData[dataIdx].username}`
        ) as HTMLImageElement;

        expect(suggestionImage).toBeInTheDocument();
        expect(suggestionImage.src).toBe(
          testSuggestionsData[dataIdx].profilePicture
        );
      });

    it("should call the onClick function passed to the message profile card when it is clicked", () => {
      const handleSuggestionClick = jest.fn();

      const element = getTestLayout(
        <SuggestionCard
          user={testSuggestionsData[0]}
          onClick={handleSuggestionClick}
        />
      );
      render(element);

      const suggestionCard = elementById("suggestion-card") as HTMLDivElement;
      click(suggestionCard);

      expect(handleSuggestionClick).toHaveBeenCalledTimes(1);
    });

    itShouldShowTheCorrectNameOfUser({ dataIdx: 0 });
    itShouldShowTheCorrectNameOfUser({ dataIdx: 1 });

    itShouldShowTheCorrectProfilePictureOfSuggestion({ dataIdx: 0 });
    itShouldShowTheCorrectProfilePictureOfSuggestion({ dataIdx: 1 });
  });
});
