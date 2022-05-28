const Notify = require("../Models/Notify");
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const Notifythem = require("../Utility/Notify");
exports.GetNotifications = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    let Phone = userdata.Phone.split("+");
    let nocountryPhone = parseInt(Phone[1].substring(2));
    console.log("->", Phone, nocountryPhone)
    await Notify.find({
      $or: [{ to: "+" + Phone[1] }, { to: nocountryPhone }],
    }).sort({ date: -1 }).then(Notifydata => {
      // console.log(Notifydata)
      res.json({ status: "success", data: Notifydata });
    }).catch(err => {
      res.json({ status: "failed", err: err });
    });

  } catch (err) {
    console.log(err); err
    res.json({ status: "failed", err: err });
  }
};
exports.Notifithem = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    const Notifydata = await new Notify({
      Notification: req.body.message,
      to: req.body.Participants,
      by: userdata.Phone,
      img: req.body.img,
      Eid: req.body.Eid,
      Maincode: req.body.Maincode,
    });
    await Notifydata.save();
    res.json({ status: "success", data: Notifydata });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err });
  }
};
