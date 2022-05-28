const mongoose = require("mongoose");
const ChatGroupSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  Participants: {
    type: Array,
    required: true,
  },
  Admin: {
    type: String,
    required: true,
  },
  GrpPhoto: {
    type: String,
  },
  Type: {
    type: String,
    default: "INDV",
  },

  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("ChatGroups", ChatGroupSchema);
