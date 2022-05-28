const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema({
  by: {
    type: String,
    required: true,
  },
  fileurl: {
    type: String,
  },
  filetype: {
    type: String,
  },
  caption: {
    type: String,
  },
  tags: {
    type: Array,
  },
  CommentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  LikeList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invitation",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Posts", PostsSchema);
