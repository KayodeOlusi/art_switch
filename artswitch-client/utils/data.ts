import { StoriesState } from "redux/features/slices/stories";

export const testPosts = [
  {
    id: "1",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption one",
    userId: "1",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    id: "2",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption two",
    userId: "2",
    likes: ["1", "2"],
    createdAt: "18/08/2021",
  },
  {
    id: "3",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["art", "design"],
    caption: "test caption three",
    userId: "3",
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
    id: 1,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 7,
    image: "https://i.pravatar.cc/150?img=1",
  },
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
