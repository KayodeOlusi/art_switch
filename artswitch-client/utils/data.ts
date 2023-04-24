import { StoriesState } from "features/slices/stories";

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
