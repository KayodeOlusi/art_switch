import { XIcon } from "@heroicons/react/solid";
import React from "react";
import { MODAL_VIEWS } from "typings/app";

type Props = {};

const UploadPost = (props: Props) => {
  return (
    <div
      className="w-[500px] rounded-lg bg-white p-3"
      id={MODAL_VIEWS.UPLOAD_POST}
      data-testid={MODAL_VIEWS.UPLOAD_POST}
    >
      <section className="flex items-center justify-between">
        <h3 className="tex-lg font-medium">Upload Post</h3>
        <XIcon className="nav-icons" />
      </section>
    </div>
  );
};

export default UploadPost;
