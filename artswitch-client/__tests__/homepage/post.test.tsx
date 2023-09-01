jest.mock("../../utils/hooks/posts/usePosts");
jest.mock("../../utils/services/posts");

import {
  roleElement,
  clickAndUpdate,
  testIdElement,
  onChangeInput,
  submitFormAndSimulate,
  imageElement,
  queryImageElement,
} from "utils/lib/test-helpers";
import {
  useGetFeedPosts,
  useGetCommentsForPost,
} from "utils/hooks/posts/usePosts";
import { testPosts } from "utils/data";
import Post from "@/components/home/posts/post";
import { getTestLayout } from "utils/lib/wrappers";
import HttpClient from "../../utils/services/client";
import { likeOrUnlikePost } from "utils/services/posts";
import { render, cleanup } from "@testing-library/react";
import PostsContainer from "@/components/containers/home/posts-container";

const mockedLikeOrUnlikePost = likeOrUnlikePost as jest.Mock<any>;
const mockedUseGetFeedPosts = useGetFeedPosts as jest.Mock<any>;
const mockedHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
const mockedUseGetCommentsForPost = useGetCommentsForPost as jest.Mock<any>;
const element = getTestLayout(<PostsContainer />, "redux-react-query");

describe("Posts Container Test", () => {
  beforeEach(() => {
    mockedUseGetFeedPosts.mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });

    mockedUseGetCommentsForPost.mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render the posts container", () => {
    render(element);

    const postsContainer = testIdElement("post-container");
    expect(postsContainer).toBeInTheDocument();
  });

  it("should render the posts-view container", () => {
    render(element);
    const postsView = testIdElement("posts-view");

    expect(postsView.id).toBe("post-view");
    expect(postsView).toBeInTheDocument();
  });

  it("should render the correct number of posts when data is available", () => {
    mockedUseGetFeedPosts.mockReturnValue({
      data: testPosts,
    });

    render(element);
    const postView = testIdElement("posts-view");

    expect(postView.children.length).toBe(testPosts.length);
  });

  describe("Single Posts test", () => {
    beforeEach(() => {
      mockedUseGetFeedPosts.mockReturnValue({
        data: testPosts,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    const itShouldRenderThePostComponentWithItsApprovedProps = (idx: number) =>
      it("should render the post component with its props", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[idx]} />,
          "redux"
        );

        render(postElement);
        expect(testPosts[idx]).toMatchObject(testPosts[idx]);
      });

    itShouldRenderThePostComponentWithItsApprovedProps(0);
    itShouldRenderThePostComponentWithItsApprovedProps(2);
    itShouldRenderThePostComponentWithItsApprovedProps(5);

    it("should render the profile picture of a user who has a post", () => {
      const postElement = getTestLayout(<Post {...testPosts[0]} />, "redux");
      render(postElement);

      const profilePictureElement = imageElement("Profile Picture");
      expect(profilePictureElement).toBeInTheDocument();
    });

    it("should render the author of the post name and username", () => {
      const postElement = getTestLayout(<Post {...testPosts[0]} />, "redux");
      render(postElement);

      const userDetailsElement = document.querySelector("#user-details");

      expect(userDetailsElement).toBeInTheDocument();
      expect(userDetailsElement?.children).toHaveLength(2);
      expect(userDetailsElement?.children[0]).toHaveTextContent(
        testPosts[0]?.user?.name
      );
      expect(userDetailsElement?.children[1]).toHaveTextContent(
        testPosts[0]?.user?.username
      );
    });

    it("should render the post image when there is one", () => {
      const postElement = getTestLayout(<Post {...testPosts[0]} />, "redux");
      render(postElement);

      const postPictureElement = imageElement("Post Image");

      expect(postPictureElement).toBeInTheDocument();
      expect(postPictureElement?.getAttribute("alt")).toBe("Post Image");
      expect(postPictureElement.getAttribute("src")).not.toBe("");
    });

    it("should not render the post image when there is no post image", () => {
      const postElement = getTestLayout(
        <Post {...testPosts[4]} />,
        "redux-react-query"
      );
      render(postElement);

      const postPictureElement = queryImageElement("Post Image");
      expect(postPictureElement).not.toBeInTheDocument();
    });

    describe("Comment on post functionality", () => {
      it("should show the comment section for a post when the comment icon is clicked", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const commentIcon = document.querySelector(
          "#comment-icon"
        ) as SVGElement;
        clickAndUpdate<SVGElement>(commentIcon);

        const commentSection = testIdElement("comment-section");
        expect(commentSection).toBeInTheDocument();
      });

      it("should show the form to comment on a post when the comment button is clicked", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const commentIcon = document.querySelector(
          "#comment-icon"
        ) as SVGElement;

        clickAndUpdate<SVGElement>(commentIcon);

        const commentFormElement = roleElement("form");
        expect(commentFormElement).toBeInTheDocument();
      });

      it("should change the value of a user's comment based on user's input", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const commentIcon = document.querySelector(
          "#comment-icon"
        ) as SVGElement;

        clickAndUpdate<SVGElement>(commentIcon);
        const commentInputElement = roleElement("textbox") as HTMLInputElement;

        onChangeInput(commentInputElement, "A great post!");
        expect(commentInputElement.value).toBe("A great post!");
      });

      it("should prevent the default reload of the page when the comment form is submitted", () => {
        const preventDefault = jest.fn();

        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const commentIcon = document.querySelector(
          "#comment-icon"
        ) as SVGElement;

        clickAndUpdate<SVGElement>(commentIcon);

        const commentFormElement = roleElement("form") as HTMLFormElement;
        const commentInputElement = roleElement("textbox") as HTMLInputElement;

        onChangeInput(commentInputElement, "A great post!");
        submitFormAndSimulate(commentFormElement, preventDefault);

        expect(preventDefault).toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalledTimes(1);
      });
    });

    describe("Like post functionality", () => {
      beforeAll(() => {
        mockedLikeOrUnlikePost.mockImplementation(() => Promise.resolve());
      });

      it("should show the button to unlike a post when a user has not liked the post", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const unlikeIcon = document.querySelector("#unlike-icon") as SVGElement;
        expect(unlikeIcon).toBeInTheDocument();
      });

      it("should show the button to like a post when a user has liked the post", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const unlikeIcon = document.querySelector("#unlike-icon") as SVGElement;
        clickAndUpdate<SVGElement>(unlikeIcon);

        const likeIcon = document.querySelector("#like-icon") as SVGElement;
        expect(likeIcon).toBeInTheDocument();
      });

      it("should call the likeOrUnlikePost function when the like icon is clicked", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const unlikeIcon = document.querySelector("#unlike-icon") as SVGElement;
        clickAndUpdate<SVGElement>(unlikeIcon);

        expect(mockedLikeOrUnlikePost).toHaveBeenCalledTimes(1);
        expect(mockedLikeOrUnlikePost).toHaveBeenCalledWith(
          "like",
          testPosts[0]._id,
          expect.any(Function)
        );
      });

      it("should show the correct number of likes for a post", () => {
        const postElement = getTestLayout(
          <Post {...testPosts[0]} />,
          "redux-react-query"
        );
        render(postElement);

        const likesNumberElement = document.querySelector("#likes-num");
        expect(likesNumberElement).toHaveTextContent("2 likes");
      });
    });
  });
});
