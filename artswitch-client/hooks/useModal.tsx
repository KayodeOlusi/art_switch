import React from "react";
import { store } from "app/store";
import { MODAL_VIEWS } from "typings/app";
import { closeAppModal, openAppModal } from "features/slices/modal";

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

  return {
    ...state,
    openModal,
    closeModal,
  };
};

export default useModal;
