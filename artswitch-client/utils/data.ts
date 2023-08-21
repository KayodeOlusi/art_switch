import { StoriesState } from "features/slices/stories";

export const testPosts = [
  {
    _id: "1",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption one",
    userId: "1",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    _id: "2",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption two",
    userId: "2",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    _id: "3",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "3",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    _id: "4",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design", "technology"],
    caption: "test caption three",
    userId: "4",
    likes: ["1", "2", "3"],
    createdAt: "18/08/2021",
  },
  {
    _id: "5",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "5",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    _id: "6",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "6",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
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
