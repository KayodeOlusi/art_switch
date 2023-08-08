const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followers: {
      type: Map,
      of: Schema.Types.ObjectId,
    },
    following: {
      type: Map,
      of: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Follow", FollowSchema);
