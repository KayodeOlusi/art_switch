const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postsSchema);
