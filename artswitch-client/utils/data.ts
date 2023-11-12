import { animations } from "./animations";
import { StoriesState } from "features/slices/stories";
import { TGetAllUserChats } from "./services/typings/chats";

export const testPosts = [
  {
    _id: "1",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption one",
    userId: "1",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
    user: {
      _id: "1",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "2",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption two",
    userId: "2",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
    user: {
      _id: "2",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "3",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "3",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
    user: {
      _id: "3",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "4",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design", "technology"],
    caption: "test caption three",
    userId: "4",
    likes: ["1", "2", "3"],
    createdAt: "18/08/2021",
    user: {
      _id: "4",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "5",
    image: "",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "5",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
    user: {
      _id: "5",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "6",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "6",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
    user: {
      _id: "6",
      name: "Jane",
      username: "jane",
      email: "jane@gmail.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
  },
];

export const testStories: Omit<StoriesState["stories"], "email"> = [
  {
    id: "1",
    email: "",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    email: "",
    name: "Luigi Mario",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "3",
    email: "",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];

export const testPostByTag = [
  {
    _id: 1,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 2,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 3,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 4,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 6,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 7,
    image: "https://i.pravatar.cc/150?img=1",
  },
];

export const testUserAccountDetails = {
  _id: "1",
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@gmail.com",
  profilePicture: "https://i.pravatar.cc/150?img=1",
  createdAt: "12/02/24",
  "follow-details": {
    followers: ["1", "2"],
    following: ["2"],
  },
};

export const signInAnimations = [
  animations.animation_one,
  animations.animation_two,
  animations.animation_five,
];

export const signUpAnimations = [
  animations.animation_nine,
  animations.animation_ten,
  animations.animation_seven,
];

export const postTags = [
  "art",
  "technology",
  "design",
  "fashion",
  "music",
  "photography",
  "travel",
  "food",
  "fitness",
  "health",
  "beauty",
  "nature",
  "architecture",
  "other",
];

export const testChatsData: TGetAllUserChats[] = [
  {
    _id: "1",
    chat: {
      _id: "2",
      name: "Test Chat",
      username: "test",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
    updatedAt: "2023-09-07T17:53:39.525+00:00",
    latestMessage: {
      _id: "1",
      sender: {
        _id: "213",
        name: "Jane",
        username: "jane",
        profilePicture: "https://i.pravatar.cc/150?img=2",
      },
      content: "Hey there",
    },
    users: [
      {
        _id: "213",
        name: "Jane",
        username: "jane",
        email: "jane@gmail.com",
        profilePicture: "https://i.pravatar.cc/150?img=1",
        createdAt: "",
        updatedAt: "",
      },
      {
        _id: "214",
        name: "John",
        username: "john",
        email: "john@gmail.com",
        profilePicture: "https://i.pravatar.cc/150?img=2",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },
  {
    _id: "2",
    chat: {
      _id: "4",
      name: "Test Chat 2",
      username: "test 2",
      profilePicture: "https://i.pravatar.cc/150?img=2",
    },
    updatedAt: "2023-09-07T17:53:39.525+00:00",
    latestMessage: {
      _id: "4",
      sender: {
        _id: "214",
        name: "John",
        username: "john",
        profilePicture: "https://i.pravatar.cc/150?img=2",
      },
      content: "Hi",
    },
    users: [
      {
        _id: "213",
        name: "Jane",
        username: "jane",
        email: "jane@gmail.com",
        profilePicture: "https://i.pravatar.cc/150?img=1",
        createdAt: "",
        updatedAt: "",
      },
      {
        _id: "214",
        name: "John",
        username: "john",
        email: "john@gmail.com",
        profilePicture: "https://i.pravatar.cc/150?img=2",
        createdAt: "",
        updatedAt: "",
      },
    ],
  },
];

export const testSuggestionsData: TSuggestion[] = [
  {
    name: "John Doe",
    username: "johndoe",
    profilePicture: "https://i.pravatar.cc/150?img=1",
    _id: "1",
  },
  {
    name: "Jane Doe",
    username: "janedoe",
    profilePicture: "https://i.pravatar.cc/150?img=2",
    _id: "2",
  },
  {
    name: "Super Mario",
    username: "supermario",
    profilePicture: "https://i.pravatar.cc/150?img=3",
    _id: "3",
  },
  {
    name: "Luigi Mario",
    username: "luigimario",
    profilePicture: "https://i.pravatar.cc/150?img=4",
    _id: "4",
  },
];
