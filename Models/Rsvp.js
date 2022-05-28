const mongoose = require("mongoose");
const RSVPSchema = new mongoose.Schema({
  By: {
    type: String,
  },
  Status: {
    type: String,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("RSVP", RSVPSchema);
