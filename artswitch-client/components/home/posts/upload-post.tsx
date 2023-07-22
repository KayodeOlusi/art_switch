import React from "react";
import { MODAL_VIEWS } from "typings/app";

type Props = {};

const UploadPost = (props: Props) => {
  return (
    <div
      className="w-[400px] bg-white"
      id={MODAL_VIEWS.UPLOAD_POST}
      data-testid={MODAL_VIEWS.UPLOAD_POST}
    >
      UploadPost here again
    </div>
  );
};

export default UploadPost;
