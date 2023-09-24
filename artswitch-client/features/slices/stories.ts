import { RootState } from "app/store";
import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import useCache from "utils/hooks/useCache";

const { getCache, setCache } = useCache();

export type StoriesState = {
  stories: Array<{
    id: string;
    name: string;
    avatar: string;
    email: string;
  }>;
};

const initialState: StoriesState = {
  stories: [],
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    loadStories: state => {
      const cachedStories = getCache("stories") as StoriesState["stories"];

      if (cachedStories) {
        state.stories = [...cachedStories];
      } else {
        const newStories = [...Array(20)].map(() => ({
          id: faker.datatype.uuid(),
          name: faker.name.fullName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
        }));

        setCache("stories", newStories);
        state.stories = [...newStories];
      }
    },
  },
});

export const storiesReducer = storiesSlice.reducer;
export const { loadStories } = storiesSlice.actions;
export const selectStories = (state: RootState) => state.stories.stories;
