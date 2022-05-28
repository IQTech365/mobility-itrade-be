const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  CommentBy: {
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
  Comment: {
    type: String,
    required: true,
  },
  likeby: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comments", CommentSchema);
