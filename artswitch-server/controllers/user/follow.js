const asyncHandler = require("express-async-handler");
const Follow = require("../../models/follow");
const { Types, isValidObjectId } = require("mongoose");

const followProcess = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { follow_id, action } = req.body;

  if (!follow_id || !isValidObjectId(follow_id) || !action)
    return res.status(400).send("Validation failed");

  let bulkFollowProcess = Follow.collection.initializeUnorderedBulkOp();
  const updateUserFollowing = bulkFollowProcess.find({
    user: Types.ObjectId(user_id),
  });
  const updateUserFollowers = bulkFollowProcess.find({
    user: Types.ObjectId(follow_id),
  });

  // TODO: Fix bulkFollowProcess to add to the map instead of replacing it

  switch (action) {
    case "follow":
      updateUserFollowing.following.set(follow_id, Types.ObjectId(follow_id));
      updateUserFollowers.followers.set(user_id, Types.ObjectId(user_id));
      await Promise.all([
        updateUserFollowing.save(),
        updateUserFollowers.save(),
      ]);
      break;
    case "un-follow":
      updateUserFollowers.followers.delete(user_id);
      updateUserFollowing.following.delete(follow_id);
      await Promise.all([
        updateUserFollowing.save(),
        updateUserFollowers.save(),
      ]);
      break;
    default:
      break;
  }

  bulkFollowProcess.execute((err, result) => {
    if (err) return res.status(400).send(err.message);

    console.log(result);
    return res.status(200).json({
      message: "Action completed successfully",
    });
  });
});

module.exports = {
  followProcess,
};
