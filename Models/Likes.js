const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  LikeBy: {
    type: String,
    required: true,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  Pid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Likes", LikeSchema);
