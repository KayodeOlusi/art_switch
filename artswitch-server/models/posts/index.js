const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String, default: "" },
    tags: [{ type: String }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postsSchema);
