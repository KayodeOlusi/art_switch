const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
