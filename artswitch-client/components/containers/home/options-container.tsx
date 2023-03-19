import React from "react";
import MessagesContainer from "./messages-container";
import SuggestionsContainer from "./suggestions-container";

type Props = {};

const OptionsContainer = (props: Props) => {
  return (
    <div className="flex flex-col space-y-12">
      <MessagesContainer />
      <SuggestionsContainer />
    </div>
  );
};

export default OptionsContainer;
