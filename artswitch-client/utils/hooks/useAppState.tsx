import React from "react";
import { store } from "app/store";
import {
  setAppChatViewState,
  setAppChatData as setChatData,
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

  const setAppChatOpenState = (state: boolean) =>
    store.dispatch(setAppChatViewState(state));

  const setAppChatData = (data: any) => store.dispatch(setChatData(data));

  return {
    ...state,
    setAppChatData,
    setAppChatOpenState,
  };
};

export default useAppState;
