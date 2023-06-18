import React from "react";
import MessagesContainer from "./messages-container";
import SuggestionsContainer from "./suggestions-container";

type Props = {};

const OptionsContainer = (props: Props) => {
  return (
    <div className="flex mt-3 flex-col space-y-4 pb-4">
      <MessagesContainer />
      <SuggestionsContainer />
    </div>
  );
};

export default OptionsContainer;
