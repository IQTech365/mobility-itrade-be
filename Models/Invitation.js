const mongoose = require("mongoose");
const InvitationSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  EventList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  Host: [
    {
      type: String,
      required: true,
    },
  ],
  HasAuth: {
    type: Boolean,
  },
  PassWord: {
    type: String,
  },
  Story: [
    {
      type: Object,
    },
  ],
  Album: [
    {
      type: Object,
    },
  ],
  AuthNums: [
    {
      type: String,
    },
  ],
  PostList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Invitation", InvitationSchema);
