const User = require("../Models/User");
const Event = require("../Models/Events");
const jwt = require("jsonwebtoken");
// const twilio = require("../Utility/Twilio");
const watsapp = require("../Utility/WatsappApi");
const Invitaion = require("../Models/Invitation");
exports.sendotp = async (req, res) => {
  twilio.initverify(req.body.Phone, res);
};

exports.verifyotp = async (req, res) => {
  // twilio.verifytoken(req.body.Phone, req.body.code, res);
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      Phone: req.body.Phone,
    }).populate("Groups");

    if (user) {
      // console.log("found login");
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.jwt_secret
      );

      res.json({
        token: token,
        status: "1",
        user: user,
      });
    } else {
      console.log("login not found");
      const user = await new User({
        Phone: req.body.Phone,
      });
      const userdata = await user.save();
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.jwt_secret
      );
      console.log("calling watsapp");
      console.log({
        userId: userdata._id,
        phoneNumber: userdata.Phone.split("+91")[1],
        countryCode: "+91",
        traits: {

        }
      });
      let isadded = await watsapp.setUser(
        {
          userId: userdata._id.toString(),
          phoneNumber: userdata.Phone.split("+91")[1],
          countryCode: "+91",
          traits: {
          }


        }, res)
      res.json({
        token: token,
        status: "1",
        user: userdata,
        isadded: isadded
      });
    }
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
exports.getuserdetails = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    // console.log(req.user);
    // console.log(req.body);
    if (req.body.Phone !== undefined) {
      let nocountry = req.body.Phone.slice(req.body.Phone.length - 10);
      // console.log(nocountry);
      const user = await User.findOne({
        $or: [{ Phone: req.body.Phone }, { Phone: nocountry }],
      });

      // console.log(user);
      if (!user) {
        res.json({ status: "fail", err: "invalid user" });
      } else {
        res.json({ status: "success", user: { Name: user.Name, Pic: user.Pic } });
      }
    } else {
      res.json({ status: "fail", err: "invalid user" });
    }

  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};

exports.userdetails = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        Name: req.body.Name,
        Gender: req.body.Gender,
        DOB: req.body.DOB,
        Pic: req.body.Image,
      },
      { new: true, useFindAndModify: false }
    );
    let isadded = await watsapp.setUser(
      {
        userId: user._id.toString(),
        phoneNumber: user.Phone.split("+91")[1],
        countryCode: "+91",
        traits: {
          name: req.body.Name,
          gender: req.body.Gender,
          dob: req.body.DOB,
        }
      }, res)
    res.json({ status: "success", user: user, isadded });
  } catch (err) {
    res.json({ status: "failed", err: err });
  }
};
exports.verify = async (req, res) => {
  const token = req.header("auth");
  if (token === undefined || token == "") {
    res.json({ status: "invalid" });
  } else {
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    if (!verified) {
      res.json({ status: "invalid" });
    } else {
      res.json({ status: "valid" });
    }
  }
};

exports.getalluserdetails = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    // console.log(req.user);
    // console.log(req.body);
    if (req.body.users !== undefined) {

      // console.log(nocountry);
      const users = await User.find({
        Phone: { $in: req.body.users }
      });

      // console.log(user);
      if (!users) {
        res.json({ status: "fail", err: "invalid user" });
      } else {
        res.json({ status: "success", users: users });
      }
    } else {
      res.json({ status: "fail", err: "invalid users" });
    }

  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};
exports.getStats = async (req, res) => {
  try {
    await User.find().then(users => {
      Invitaion.find().then(inv => {
        Event.find().then(events => {
          res.send('users : ' + users.length + ' ,invites : ' + inv.length + ',events: ' + events.length);
        }).catch(err => {
          console.log(err);
          res.json({ status: "fail", err: err });
        })
      }).catch(err => {
        console.log(err);
        res.json({ status: "fail", err: err });
      })
    }).catch(err => {
      console.log(err);
      res.json({ status: "fail", err: err });
    })
  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
}