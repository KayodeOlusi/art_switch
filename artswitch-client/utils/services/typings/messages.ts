import { TGetAllUserChats } from "./chats";

export type TChatMessage = {
  _id: string;
  sender: string;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
};

export type TSingleMessage = {
  chat: {
    chat: string;
    createdAt: string;
    latestMessage: string;
    updatedAt: string;
    users: { _id: string; name: string }[];
  };
  content: string;
  createdAt: string;
  sender: string;
  updatedAt: string;
  _id: string;
};
