const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Phone: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  Pic: {
    type: String,
  },
  Groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatGroups",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", UserSchema);
