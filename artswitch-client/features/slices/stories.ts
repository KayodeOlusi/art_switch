import { createSlice } from "@reduxjs/toolkit";
import { LRUCache } from "lru-cache";
import { faker } from "@faker-js/faker";
import { RootState } from "app/store";

export type StoriesState = {
  stories: Array<{
    id: string;
    name: string;
    avatar: string;
    email: string;
  }>;
};

const cache = new LRUCache({
  max: 25,
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
      const cachedStories = cache.get("stories") as StoriesState["stories"];

      if (cachedStories) {
        state.stories = [...cachedStories];
      } else {
        const newStories = [...Array(20)].map(() => ({
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
        }));

        cache.set("stories", newStories);
        state.stories = [...newStories];
      }
    },
  },
});

export const storiesReducer = storiesSlice.reducer;
export const { loadStories } = storiesSlice.actions;
export const selectStories = (state: RootState) => state.stories.stories;
