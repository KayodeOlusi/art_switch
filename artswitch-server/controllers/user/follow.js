const asyncHandler = require("express-async-handler");
const Follow = require("../../models/follow");
const { Types } = require("mongoose");

const followUser = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { follow_id } = req.body;

  if (!follow_id) return res.status(400).send("No follow_id provided");

  let bulkFollowProcess = Follow.collection.initializeUnorderedBulkOp();

  bulkFollowProcess.find({ user: Types.ObjectId(user_id) }).updateOne({
    $addToSet: {
      following: Types.ObjectId(follow_id),
    },
  });

  bulkFollowProcess.find({ user: Types.ObjectId(follow_id) }).updateOne({
    $addToSet: {
      followers: Types.ObjectId(user_id),
    },
  });

  bulkFollowProcess.execute((err, result) => {
    if (err) return res.status(400).send(err.message);

    return res.status(200).json({
      message: "Followed successfully",
    });
  });
});

module.exports = {
  followUser,
};
