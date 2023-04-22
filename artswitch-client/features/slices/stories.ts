import { createSlice } from "@reduxjs/toolkit";
import { LRUCache } from "lru-cache";
import { faker } from "@faker-js/faker";

type StoriesState = {
  stories: Array<{
    id: string;
    name: string;
    avatar: string;
    email: string;
  }>;
};

const cache = new LRUCache({
  max: 20,
  allowStale: true,
  ttl: 1000 * 60 * 10,
});

const initialState: StoriesState = {
  stories: [],
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    loadStories: state => {
      const fakeStories = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
      }));

      cache.set("stories", fakeStories);
      state.stories = [...fakeStories];
    },
  },
});

export const storiesReducer = storiesSlice.reducer;
export const { loadStories } = storiesSlice.actions;
export const storiesSelector = (state: StoriesState) => {
  if (cache.has("stories")) return cache.get("stories");

  return state.stories;
};
