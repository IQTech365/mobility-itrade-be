const ChatGroup = require("../Models/ChatGroups");
const Chat = require("../Models/Chats");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const User = require("../Models/User.js");
exports.CreateGroup = async (req, res) => {
  try {
    // console.log(req.body);
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });

    let chatgroup = await new ChatGroup({
      Name: req.body.Name,
      room: req.body.room,
      Participants: [...req.body.Participants, user.Phone],
      GrpPhoto: req.body.GrpPhoto,
      Admin: user.Phone,
      Type: req.body.Type,
    });

    const grpdetails = await chatgroup.save();

    res.json({ status: "success", grpdetails });
  } catch (err) {
    res.json({ status: "failed", err });
  }
};

exports.GetGroups = async (req, res) => {
  try {
    // console.log("GetGroups");
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    // console.log(req.user);
    const user = await User.findOne({ _id: req.user._id });

    const userdata = await User.findOne({ _id: req.user._id });
    // console.log(userdata);
    let Phone = userdata.Phone.split("+");
    // console.log(Phone[1]);
    let nocountryPhone = parseInt(Phone[1].substring(2));
    // console.log(nocountryPhone);

    const Chatgroup = await ChatGroup.find({
      $or: [{ Participants: user.Phone }, { Participants: nocountryPhone }],
    }).populate("chats");
    // console.log("Chatgroup");

    res.json({ status: "success", Chatgroup: Chatgroup });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err });
  }
};
exports.GetChats = async (req, res) => {
  try {
    console.log(req.body._id);
    const chatdata = await Chat.find({
      grp: req.body._id,
    });
    res.json({ status: "success", chatdata: chatdata });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
