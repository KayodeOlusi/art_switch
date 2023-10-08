import React from "react";
import { store } from "app/store";
import {
  setAppChatViewState,
  setAppChatData as setChatData,
  setToggleFetchMessage,
} from "features/slices/app";

const useAppState = () => {
  const appState = store.getState().app;
  const [state, setModalState] = React.useState(appState);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const appState = store.getState().app;
      setModalState(appState);
    });

    return () => unsubscribe();
  }, [appState]);

  const setAppChatOpenState = (value: boolean) =>
    store.dispatch(setAppChatViewState(value));

  const setAppChatData = (data: any) => store.dispatch(setChatData(data));

  const toggleRefetchMessages = (value: boolean) =>
    store.dispatch(setToggleFetchMessage(value));

  return {
    ...state,
    setAppChatData,
    setAppChatOpenState,
    toggleRefetchMessages,
  };
};

export default useAppState;
