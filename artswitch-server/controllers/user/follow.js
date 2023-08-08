const asyncHandler = require("express-async-handler");
const Follow = require("../../models/follow");
const { Types, isValidObjectId } = require("mongoose");

const followUser = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { follow_id } = req.body;

  if (!follow_id || !isValidObjectId(follow_id))
    return res.status(400).send("No follow_id provided");

  let bulkFollowProcess = Follow.collection.initializeUnorderedBulkOp();

  const updateUserFollowing = bulkFollowProcess.find({
    user: Types.ObjectId(user_id),
  });
  updateUserFollowing.following.set(follow_id, Types.ObjectId(follow_id));

  const updateUserFollowers = bulkFollowProcess.find({
    user: Types.ObjectId(follow_id),
  });
  updateUserFollowers.followers.set(user_id, Types.ObjectId(user_id));

  await Promise.all([updateUserFollowing.save(), updateUserFollowers.save()]);

  bulkFollowProcess.execute((err, result) => {
    if (err) return res.status(400).send(err.message);

    console.log(result);
    return res.status(200).json({
      message: "Followed successfully",
    });
  });
});

module.exports = {
  followUser,
};
