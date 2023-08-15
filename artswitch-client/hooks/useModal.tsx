import {
  closeAppModal,
  openAppModal,
  setModalData,
} from "features/slices/modal";
import React from "react";
import { store } from "app/store";
import { MODAL_VIEWS } from "typings/app";

const useModal = () => {
  const appModalState = store.getState().modal;
  const [state, setModalState] = React.useState(appModalState);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const appModalState = store.getState().modal;
      setModalState(appModalState);
    });

    return () => unsubscribe();
  }, [appModalState]);

  const openModal = (view: MODAL_VIEWS) =>
    store.dispatch(openAppModal({ view }));

  const closeModal = () => store.dispatch(closeAppModal());

  const setModalViewData = (data: any) => store.dispatch(setModalData(data));

  return {
    ...state,
    openModal,
    closeModal,
    setModalViewData,
  };
};

export default useModal;
