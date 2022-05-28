const mongoose = require("mongoose");
const Notifyschema = new mongoose.Schema({
  Notification: {
    type: String,
  },
  to: {
    type: Array,
    required: true,
  },
  by: {
    type: String,
  },
  img: {
    type: String,
  },
  MainCode: {
    type: String,
    required: true,
  },
  Eid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notify", Notifyschema);
