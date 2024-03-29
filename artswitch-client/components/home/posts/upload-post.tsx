import React from "react";
import useModal from "utils/hooks/useModal";
import { postTags } from "utils/data";
import { MODAL_VIEWS } from "utils/typings/app";
import { XIcon } from "@heroicons/react/solid";
import { errorMessage, successMessage } from "utils/services/client";
import { CameraIcon, TrashIcon } from "@heroicons/react/outline";
import { createPost } from "utils/services/posts";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "react-query";

type TPostTagProps = {
  tag: string;
  formValues: TFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<TFormValues>>;
};

type TFormValues = {
  caption: string;
  selectedTags: string[];
  image: string;
};

export const PostTag = ({ tag, formValues, setFormValues }: TPostTagProps) => (
  <button
    key={tag}
    type="button"
    className={`${
      formValues.selectedTags.includes(tag) && "border-[2px] border-gray-500"
    } rounded-full px-4 py-2 text-sm mr-2 mt-2 capitalize
  bg-gray-100 text-secondaryText`}
    onClick={() => {
      if (formValues.selectedTags.includes(tag)) {
        setFormValues(prev => ({
          ...prev,
          selectedTags: prev.selectedTags.filter(t => t !== tag),
        }));
      } else {
        setFormValues(prev => ({
          ...prev,
          selectedTags: [...prev.selectedTags, tag],
        }));
      }
    }}
  >
    {tag}
  </button>
);

const UploadPost = () => {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [formValues, setFormValues] = React.useState<TFormValues>({
    caption: "",
    selectedTags: [],
    image: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formValues.caption ||
      !formValues.selectedTags.length ||
      !formValues.image
    ) {
      return errorMessage("Please fill in all required fields");
    }

    setLoadingUpload(true);
    let data = {
      caption: formValues.caption,
      tags: formValues.selectedTags,
      image: formValues.image,
    };

    await createPost(
      data,
      async () => {
        await queryClient.refetchQueries("feed-posts");
        successMessage("Post created Successfully");
        setLoadingUpload(false);
        return closeModal();
      },
      () => setLoadingUpload(false)
    );
  };

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const maxSize = 1024 * 1024 * 2;

    if (e.target.files && e.target.files[0].size > maxSize) {
      return errorMessage("Image size is too large");
    }

    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      return setFormValues(prev => ({
        ...prev,
        image: readerEvent.target?.result as string,
      }));
    };
  };

  return (
    <div
      id={MODAL_VIEWS.UPLOAD_POST}
      data-testid={MODAL_VIEWS.UPLOAD_POST}
      className="w-full h-[100svh] sm:h-auto sm:w-[500px] sm:rounded-lg
       bg-white p-3 overflow-y-scroll"
    >
      <section className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Upload Post</h3>
        <XIcon
          role="button"
          className="close-icon"
          onClick={closeModal}
          data-testid="close-icon"
        />
      </section>

      <form className="space-y-8 mt-9" role="form" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <textarea
            role="textbox"
            value={formValues.caption}
            className="p-3 rounded-lg h-40 text-sm"
            placeholder="What new art have you created?"
            onChange={e =>
              setFormValues(prev => ({ ...prev, caption: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-sm">Select Category *</p>
          <div className="mt-3">
            {postTags.map((tag: string) => (
              <PostTag
                key={tag}
                tag={tag}
                formValues={formValues}
                setFormValues={setFormValues}
              />
            ))}
          </div>
        </div>
        {formValues.image ? (
          <div className="relative w-full h-32">
            <TrashIcon
              className="text-red-500 w-5 h-5 absolute right-0 cursor-pointer"
              onClick={() => setFormValues(prev => ({ ...prev, image: "" }))}
            />
            <img
              alt="image"
              src={formValues.image}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div
            onClick={() => imageInputRef.current?.click()}
            className="w-full flex flex-col items-center space-y-2 cursor-pointer
              justify-center mt-60 border-dashed border-[2px] h-32 rounded-lg"
          >
            <CameraIcon className="w-10 h-10" />
            <p className="text-xs font-medium text-secondaryText">
              Click to upload image
            </p>
          </div>
        )}
        <input
          hidden
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageLoad}
        />
        <button
          type="submit"
          disabled={loadingUpload}
          className="w-full bg-black text-white py-5
          rounded-lg font-bold text-sm"
        >
          {loadingUpload ? (
            <ClipLoader size={15} color="#FFFFFF" />
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
