const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    caption: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postsSchema);
