jest.mock("../../hooks/useModal");

import useModal from "hooks/useModal";
import { MODAL_VIEWS } from "typings/app";
import { getTestLayout } from "utils/lib/wrappers";
import ModalContainer from "@/components/global/modal";
import { act, cleanup, render, screen } from "@testing-library/react";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const modalElement = getTestLayout(<ModalContainer />, "redux-react-query");

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
      render(modalElement);
      const modalContainer = screen.getByTestId("modal-container");
      expect(modalContainer.children.length).toEqual(0);
    });

    it("should render the modal child element when isOpen is true", async () => {
      mockedUseModal.mockReturnValueOnce({
        isOpen: true,
        view: MODAL_VIEWS.NONE,
        closeModal: () => null,
      });

      renderElementWithIntersectionObserver(modalElement);

      await act(async () => {
        const modalContainer = screen.getByTestId("modal-container");
        expect(modalContainer.children.length).toEqual(1);
      });
    });

    const itShouldRenderTheAppropriateModalChildElementWhenIsOpenIsTrue = (
      modalView: MODAL_VIEWS
    ) => {
      it(`should render ${modalView} view when the modal container 
      is open and the view is ${modalView}`, async () => {
        mockedUseModal.mockReturnValueOnce({
          isOpen: true,
          view: modalView,
          closeModal: () => null,
        });

        renderElementWithIntersectionObserver(modalElement);

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
      itShouldRenderTheAppropriateModalChildElementWhenIsOpenIsTrue(
        MODAL_VIEWS.SEARCH_FOR_ARTIST
      );
      itShouldRenderTheAppropriateModalChildElementWhenIsOpenIsTrue(
        MODAL_VIEWS.VIEW_SINGLE_POST
      );
    });
  });
});
