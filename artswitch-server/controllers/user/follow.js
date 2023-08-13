const Follow = require("../../models/follow");
const asyncHandler = require("express-async-handler");
const { Types, isValidObjectId } = require("mongoose");

// @access  Private
const performOperation = async (action, follow_id, user_id) => {
  try {
    await Follow.bulkWrite([
      {
        updateOne: {
          filter: { user: Types.ObjectId(user_id) },
          update: {
            [action === "follow" ? "$addToSet" : "$pull"]: {
              following: Types.ObjectId(follow_id),
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { user: Types.ObjectId(follow_id) },
          update: {
            [action === "follow" ? "$addToSet" : "$pull"]: {
              followers: Types.ObjectId(user_id),
            },
          },
          upsert: true,
        },
      },
    ]);

    return true;
  } catch (error) {
    return false;
  }
};

const followProcess = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { follow_id, action } = req.body;

  if (user_id.toString() === follow_id.toString())
    return res.status(400).json({ message: "Invalid request" });

  if (!follow_id || !isValidObjectId(follow_id) || !action)
    return res.status(400).send("Validation failed");

  const result = await performOperation(action, follow_id, user_id);
  if (!result) return res.status(500).json({ message: "Something went wrong" });

  return res.status(200).json({ message: "Success" });
});

module.exports = {
  followProcess,
};
