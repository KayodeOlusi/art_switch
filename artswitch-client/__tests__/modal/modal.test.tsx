jest.mock("../../hooks/useModal");

import { store } from "app/store";
import useModal from "hooks/useModal";
import { Provider } from "react-redux";
import { MODAL_VIEWS } from "typings/app";
import ModalContainer from "@/components/global/modal";
import { act, cleanup, render, screen } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const MockedModalWithStore = () => (
  <Provider store={store}>
    <ModalContainer />
  </Provider>
);

describe("Modal Container Test", () => {
  const mockedUseModal = useModal as jest.Mock<any>;

  const renderElementWithIntersectionObserver = (
    element: React.ReactElement
  ) => {
    render(element);
    mockAllIsIntersecting(true);
  };

  describe("Modal visibility test", () => {
    beforeEach(() => {
      mockedUseModal.mockReturnValue({
        isOpen: false,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should not render the modal child element when isOpen is false", () => {
      render(<MockedModalWithStore />);
      const modalContainer = screen.getByTestId("modal-container");
      expect(modalContainer.children.length).toEqual(0);
    });

    it("should render the modal child element when isOpen is true", async () => {
      mockedUseModal.mockReturnValueOnce({
        isOpen: true,
        view: MODAL_VIEWS.NONE,
        closeModal: () => null,
      });

      renderElementWithIntersectionObserver(<MockedModalWithStore />);

      await act(async () => {
        const modalContainer = screen.getByTestId("modal-container");
        expect(modalContainer.children.length).toEqual(1);
      });
    });

    const itShouldRenderTheAppropriateModalChildElementWhenIsOpenIsTrue = (
      modalView: MODAL_VIEWS
    ) => {
      it(`should render ${modalView} view when the modal container is open and the view is ${modalView}`, async () => {
        mockedUseModal.mockReturnValueOnce({
          isOpen: true,
          view: modalView,
          closeModal: () => null,
        });

        renderElementWithIntersectionObserver(<MockedModalWithStore />);

        await act(async () => {
          const modalContainerChild = screen.getByTestId(modalView);

          expect(modalContainerChild).toBeInTheDocument();
          expect(modalContainerChild.id).toBe(modalView);
        });
      });
    };

    describe("Modal child element test", () => {
      itShouldRenderTheAppropriateModalChildElementWhenIsOpenIsTrue(
        MODAL_VIEWS.UPLOAD_POST
      );
    });
  });
});
