jest.mock("../../../hooks/useModal");

import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
} from "@testing-library/react";
import { store } from "app/store";
import useModal from "hooks/useModal";
import { postTags } from "utils/data";
import { Provider } from "react-redux";
import { MODAL_VIEWS } from "typings/app";
import { closeAppModal } from "features/slices/modal";
import ModalContainer from "@/components/global/modal";
import ReactTestUtils from "react-dom/test-utils";
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

  it.skip("should close the modal when the CLOSE icon is clicked", async () => {
    renderElementWithIntersectionObserver(<MockedModalWithStore />);

    await act(async () => {
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

  it.skip("should show a grey border on a selected tag", async () => {
    renderPostTags();

    await act(async () => {
      const singleTag = screen.getByText("art");
      fireEvent.click(singleTag);

      expect(singleTag).toHaveClass("border-[2px]");
    });
  });

  it("should call the setState function to add a tag to the list of selected tags", async () => {
    renderPostTags();

    await act(async () => {
      const singleTag = screen.getByText("art");
      fireEvent.click(singleTag);

      expect(mockedSetStateAction).toHaveBeenCalledTimes(1);
    });
  });
});
