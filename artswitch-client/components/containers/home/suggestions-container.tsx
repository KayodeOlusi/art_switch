import React from "react";

type Props = {};

const SuggestionsContainer = (props: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-4 md:h-72 lg:h-96">
      <section className="flex justify-between items-center">
        <h3 className="font-bold">Suggestions</h3>
        <p className="text-secondaryText text-sm cursor-pointer">See all</p>
      </section>
    </div>
  );
};

export default SuggestionsContainer;
