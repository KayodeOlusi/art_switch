jest.mock("../../../hooks/useModal");

import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { store } from "app/store";
import useModal from "hooks/useModal";
import { postTags } from "utils/data";
import { Provider } from "react-redux";
import { MODAL_VIEWS } from "typings/app";
import { toast } from "react-hot-toast";
import ReactTestUtils from "react-dom/test-utils";
import { closeAppModal } from "features/slices/modal";
import ModalContainer from "@/components/global/modal";
import { PostTag } from "@/components/home/posts/upload-post";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const MockedModalWithStore = () => (
  <Provider store={store}>
    <ModalContainer />
  </Provider>
);

const formValues = {
  caption: "",
  selectedTags: [],
  image: "",
};

jest.useFakeTimers();

describe("Upload Post Modal View Test", () => {
  const mockedUseModal = useModal as jest.Mock<any>;
  const mockedSetStateAction = jest.fn();

  const renderElementWithIntersectionObserver = (
    element: React.ReactElement
  ) => {
    render(element);
    mockAllIsIntersecting(true);
  };

  const renderSingleTag = () =>
    renderElementWithIntersectionObserver(
      <PostTag
        tag="art"
        formValues={formValues}
        setFormValues={mockedSetStateAction}
      />
    );

  const renderPostTags = () =>
    postTags.map(tag =>
      renderElementWithIntersectionObserver(
        <PostTag
          key={tag}
          tag={tag}
          formValues={formValues}
          setFormValues={mockedSetStateAction}
        />
      )
    );

  beforeEach(() => {
    mockedUseModal.mockReturnValue({
      isOpen: true,
      view: MODAL_VIEWS.UPLOAD_POST,
      closeModal: () => store.dispatch(closeAppModal()),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render the UPLOAD_POST Modal view when the modal view is UPLOAD_POST", async () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
      const uploadPostView = screen.getByTestId(MODAL_VIEWS.UPLOAD_POST);

      expect(uploadPostView).toBeInTheDocument();
      expect(uploadPostView).not.toBeNull();
    });
  });

  // TODO: Fix test
  it.skip("should close the modal when the CLOSE icon is clicked", () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    act(() => {
      const modalContainer = screen.getByTestId("modal-container");
      const uploadPostView = screen.getByTestId(MODAL_VIEWS.UPLOAD_POST);
      const closeModalIcon = screen.getByTestId("close-icon");
      fireEvent.click(closeModalIcon, {});

      expect(uploadPostView).not.toBeInTheDocument();
    });
  });

  it("should change the textarea element value based on the user's input", async () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
      const textAreaElement = screen.getByRole("textbox");
      fireEvent.change(textAreaElement, { target: { value: "A Post" } });

      expect(textAreaElement).toHaveValue("A Post");
    });
  });

  // TODO: Fix test
  it.skip("should show a grey border on a selected tag", async () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
      const singleTag = screen.getByText("art");
      fireEvent.click(singleTag);

      act(() => {
        expect(singleTag).toHaveClass("border-[2px]");
      });
    });
  });

  it("should call the setState function to add a tag to the list of selected tags", () => {
    renderPostTags();

    act(() => {
      const singleTag = screen.getByText("art");
      fireEvent.click(singleTag);

      expect(mockedSetStateAction).toHaveBeenCalledTimes(1);
    });
  });

  it("should prevent the default action of the form element when it is submitted", async () => {
    const preventDefault = jest.fn();
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
      const formElement = screen.getByRole("form");
      ReactTestUtils.Simulate.submit(formElement, {
        preventDefault,
      });
    });

    await waitFor(() => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  it("should call the error toast when user does not fill in all required fields", async () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
      const formElement = screen.getByRole("form");
      fireEvent.submit(formElement);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });
});
