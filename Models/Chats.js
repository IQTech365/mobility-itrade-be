const mongoose = require("mongoose");
const ChatsSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  grp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatGroups",
  },
});
module.exports = mongoose.model("Chats", ChatsSchema);
