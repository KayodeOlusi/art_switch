const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
