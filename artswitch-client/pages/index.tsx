import Head from "next/head";
import React from "react";
import AppLayout from "@/components/layout";
import { useAppDispatch } from "app/hooks";
import { NextPageWithLayout } from "typings/app";
import PostsContainer from "@/components/containers/home/posts-container";
import ExploreContainer from "@/components/containers/home/explore-container";
import OptionsContainer from "@/components/containers/home/options-container";
import { loadStories } from "features/slices/stories";

const Home: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadStories());
  }, []);

  return (
    <div>
      <Head>
        <title>ArtSwitch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <section className="hidden lg:block lg:col-span-1">
          <ExploreContainer />
        </section>
        <section className="col-auto md:col-span-2 lg:col-span-2">
          <PostsContainer />
        </section>
        <section className="hidden md:block md:col-span-1">
          <OptionsContainer />
        </section>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
