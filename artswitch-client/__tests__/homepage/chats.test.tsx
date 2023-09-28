jest.mock("../../utils/hooks/chats/useChats");

import {
  elementById,
  roleElement,
  textElement,
  queryImageElement,
  click,
} from "utils/lib/test-helpers";
import { testChatsData } from "utils/data";
import { getTestLayout } from "utils/lib/wrappers";
import { cleanup, render } from "@testing-library/react";
import { useGetChats } from "utils/hooks/chats/useChats";
import MessagesContainer from "@/components/containers/home/messages-container";
import MessageProfileCard from "@/components/home/messages/message-profile-card";

describe("Message Container", () => {
  const mockedUseGetChats = useGetChats as jest.Mock<any>;

  beforeEach(() => {
    mockedUseGetChats.mockReturnValue({
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
    it("should show the messages header", () => {
      const element = getTestLayout(<MessagesContainer />, "redux-react-query");

      render(element);
      const messageHeader = textElement("Messages");

      expect(messageHeader).toBeInTheDocument();
      expect(messageHeader.textContent).toBe("Messages");
    });

    it("should show the pencil svg icon to create new chat", () => {
      const element = getTestLayout(<MessagesContainer />, "redux-react-query");

      render(element);
      const pencilIcon = elementById("create-chat");

      expect(pencilIcon).toBeInTheDocument();
      expect(pencilIcon?.tagName).toBe("svg");
    });
  });

  describe("Message Container Functionality", () => {
    it("should show an error message when there is an error fetching all user's chat", () => {
      mockedUseGetChats.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: { message: "Error fetching chats" },
      });

      const element = getTestLayout(<MessagesContainer />, "redux-react-query");
      render(element);

      const errorMessage = roleElement("alert");

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.textContent).toBe("Error fetching chats");
    });

    it("should show the loader when fetching all user's chat", () => {
      mockedUseGetChats.mockReturnValueOnce({
        data: [],
        isLoading: true,
        error: null,
      });

      const element = getTestLayout(<MessagesContainer />, "redux-react-query");
      render(element);

      const loader = roleElement("progressbar");
      expect(loader).toBeInTheDocument();
    });

    it("should show the text for no messages when a user has no chats", () => {
      mockedUseGetChats.mockReturnValueOnce({
        data: [],
        isLoading: false,
        error: null,
      });

      const element = getTestLayout(<MessagesContainer />, "redux-react-query");
      render(element);

      const noMessages = textElement("No messages yet");

      expect(noMessages).toBeInTheDocument();
      expect(noMessages.textContent).toBe("No messages yet");
    });

    const itShouldRenderTheRightAmountOfMessageProfileCards = ({
      chatsNum,
      expectedVal,
    }: {
      chatsNum: number;
      expectedVal: number;
    }) =>
      it("should render the message profile card when a user has chats", () => {
        mockedUseGetChats.mockReturnValueOnce({
          data: testChatsData.slice(chatsNum),
          isLoading: false,
          error: null,
        });

        const element = getTestLayout(
          <MessagesContainer />,
          "redux-react-query"
        );
        render(element);

        const chatContainer = elementById("chat-container");

        expect(chatContainer?.children.length).toBe(expectedVal);
      });

    itShouldRenderTheRightAmountOfMessageProfileCards({
      chatsNum: 0,
      expectedVal: 2,
    });
    itShouldRenderTheRightAmountOfMessageProfileCards({
      chatsNum: 1,
      expectedVal: 1,
    });
  });

  describe("Message Profile Card UI", () => {
    const itShouldShowTheCorrectNameOfChat = ({
      chatIdx,
    }: {
      chatIdx: number;
    }) =>
      it("should show the name of the chat", () => {
        const handleChatClick = jest.fn();

        const element = getTestLayout(
          <MessageProfileCard
            chat={testChatsData[chatIdx]}
            onClick={handleChatClick}
          />,
          "redux"
        );
        render(element);

        const chatName = textElement(testChatsData[chatIdx].chat.name);

        expect(chatName).toBeInTheDocument();
        expect(chatName.textContent).toBe(testChatsData[chatIdx].chat.name);
      });

    const itShouldShowTheCorrectProfilePictureOfChat = ({
      chatIdx,
    }: {
      chatIdx: number;
    }) =>
      it("should show the profile picture of the chat", () => {
        const handleChatClick = jest.fn();

        const element = getTestLayout(
          <MessageProfileCard
            chat={testChatsData[chatIdx]}
            onClick={handleChatClick}
          />,
          "redux"
        );
        render(element);

        const chatImage = queryImageElement(
          `chat-image-${testChatsData[chatIdx].chat.name}`
        ) as HTMLImageElement;

        expect(chatImage).toBeInTheDocument();
        expect(chatImage.src).toBe(testChatsData[chatIdx].chat.profilePicture);
      });

    const itShouldShowTheCorrectTimeAChatWasLastUpdated = ({
      chatIdx,
      expectedVal,
    }: {
      chatIdx: number;
      expectedVal: string;
    }) =>
      it("should show the time the chat was last updated", () => {
        const handleChatClick = jest.fn();

        const element = getTestLayout(
          <MessageProfileCard
            chat={testChatsData[chatIdx]}
            onClick={handleChatClick}
          />,
          "redux"
        );
        render(element);

        const chatTime = elementById("chat-time");

        expect(chatTime).toBeInTheDocument();
        expect(chatTime?.textContent).toBe(expectedVal);
      });

    const itShouldShowTheCorrectMessageAChatWasLastUpdated = ({
      chatIdx,
      expectedVal,
    }: {
      chatIdx: number;
      expectedVal: string;
    }) =>
      it(`should show the message the chat with index ${chatIdx} was last updated`, () => {
        const handleChatClick = jest.fn();

        const element = getTestLayout(
          <MessageProfileCard
            chat={testChatsData[chatIdx]}
            onClick={handleChatClick}
          />,
          "redux"
        );
        render(element);

        const chatMessage = elementById("chat-message");

        expect(chatMessage).toBeInTheDocument();
        expect(chatMessage?.textContent).toBe(expectedVal);
      });

    it("should call the onClick function passed to the message profile card when it is clicked", () => {
      const handleChatClick = jest.fn();

      const element = getTestLayout(
        <MessageProfileCard
          chat={testChatsData[0]}
          onClick={handleChatClick}
        />,
        "redux"
      );
      render(element);

      const chatCard = elementById("chat-card") as HTMLDivElement;
      click(chatCard);

      expect(handleChatClick).toHaveBeenCalledTimes(1);
    });

    itShouldShowTheCorrectNameOfChat({ chatIdx: 0 });
    itShouldShowTheCorrectNameOfChat({ chatIdx: 1 });

    itShouldShowTheCorrectProfilePictureOfChat({ chatIdx: 0 });
    itShouldShowTheCorrectProfilePictureOfChat({ chatIdx: 1 });

    itShouldShowTheCorrectTimeAChatWasLastUpdated({
      chatIdx: 0,
      expectedVal: "Sep 7",
    });
    itShouldShowTheCorrectTimeAChatWasLastUpdated({
      chatIdx: 1,
      expectedVal: "Sep 7",
    });

    itShouldShowTheCorrectMessageAChatWasLastUpdated({
      chatIdx: 0,
      expectedVal: "Hey there",
    });
    itShouldShowTheCorrectMessageAChatWasLastUpdated({
      chatIdx: 1,
      expectedVal: "Hi",
    });
  });
});
