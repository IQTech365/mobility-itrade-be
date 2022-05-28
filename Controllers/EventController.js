const Invitaion = require("../Models/Invitation");
const Event = require("../Models/Events");
const RSVP = require("../Models/Rsvp");
const Likes = require("../Models/Likes");
const Comments = require("../Models/Comments");
// const twilio = require("../Utility/Twilio");
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const path = require("path");
// const { findByIdAndUpdate } = require("../Models/Events");
const Notify = require("../Models/Notify");
const Events = require("../Models/Events");
const dotenv = require("dotenv");
const wocomm = require("../Utility/Woocommerce");
const watsapp = require("../Utility/WatsappApi");
const amazonPaapi = require("amazon-paapi");

exports.create = async (req, res) => {
  let createdEventList = [];
  let Meetingarray = [];
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findOne({ _id: req.user._id });
  const Events = req.body.Events;
  const PWD =
    Events[0].IsPassword === true
      ? Math.floor(1000 + Math.random() * 9000)
      : null;

  const invitaition = await new Invitaion({
    Type: req.body.Type,
    Host: [user.Phone],
    Story: req.body.Story,
    Album: req.body.Album,
    HasAuth: Events[0].IsPassword,
    PassWord: PWD,
  });

  const Invitaitondata = await invitaition.save();
  let MainCode = Invitaitondata._id.toString();
  await Events.map(async (eventdata, index) => {
    //setting meeting
    Endtime = eventdata.Time.split(":");
    // consolelog(Endtime);
    Endtime[0] = Endtime[0] + 1;
    if (Endtime[0] < 10) {
      Endtime = "0" + Endtime[0] + Endtime[1];
    } else {
      Endtime = Endtime[0] + Endtime[1];
    }
    // consolelog("mapping");
    if (eventdata.VenueType === "Online") {
      eventdata.Location = "";
    } else if (eventdata.VenueType === "Offline") {
      eventdata.Link = "";
    } else {
    }
    if (req.body.EntryWay === "Code") {
      eventdata.Participants = [];
    } else {
    }

    const singleevent = await new Event({
      Name: eventdata.Name,
      InvId: Invitaitondata._id,
      Date: eventdata.Date,
      Time: eventdata.Time,
      Description: eventdata.Description,
      GuestInvite: eventdata.GuestInvite,
      Location: eventdata.Location,
      Link: eventdata.Link,
      MainCode: MainCode,
      Participants: [...eventdata.Participants],
      Schedule: eventdata.Schedule,
      VenueType: eventdata.VenueType,
      eventCode: MainCode + "_" + index,
      file: eventdata.file,
      filetype: eventdata.filetype,
      Host: [user.Phone],
      EntryWay: req.body.EntryWay.trim(),
      code: req.body.code[index],
      HostSelectedMenu: req.body.HostSelectedMenu,
    });

    let singleeventdata = await singleevent.save();
    createdEventList.push(singleeventdata);
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    try {
      await Invitaion.findByIdAndUpdate(
        Invitaitondata._id,
        {
          $push: { EventList: singleeventdata._id },
        },
        options
      );
    } catch (err) {
      console.log(err);
      res.json({ status: "failed", err: err });
    }

    Meetingarray = await Meetingarray.concat(eventdata.Participants);
    Meetingarray = await [...new Set(Meetingarray)];

    if (index === Events.length - 1) {
      // await twilio.sendtowatsapp(
      //   Meetingarray,
      //   "You have been Mobily invited for participating in celebration of " +
      //   req.body.Type +
      //   ".Click here to join:https://www.google.com/" +
      //   MainCode
      // );

      const Notifydata = await new Notify({
        Notification:
          "You have been Mobily invited in celebration of " +
          req.body.Type +
          " By " +
          user.Name,
        to: Meetingarray,
        by: user.Phone,
        img: user.Pic,
        Eid: MainCode + "_" + 0,
        MainCode: MainCode,
        date: req.body.date,
      });
      await Notifydata.save()
        .then(() => {
          // consolelog("Notificaion added");
          return "Success";
        })
        .catch(() => {
          return "failed";
        });
    }
    if (Events.length === index + 1) {
      //  console.log("not last")
      res.json({
        createdEventList: createdEventList,
        MainCode: MainCode,
        EntryWay: req.body.EntryWay.trim(),
        code: req.body.code,
        HasAuth: Events[0].IsPassword,
        PassWord: PWD,
      });
    } else {
      console.log("not last");
    }
  });

  //// console.log("result");
  //// console.log({ createdEventList: createdEventList, MainCode: MainCode });
};

exports.RSVP = async (req, res) => {
  try {
    // consolelog("req.body");
    // consolelog(req.body);
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id })
      .then(async (user) => {
        await Event.findById(req.body.id)
          .then(async (Events) => {
            let UpdateEvents = "";
            // consolelog(Events._id);
            let id = Events._id;
            let rsvpdata = "";
            let finaldata = "";
            if (Events !== null) {
              // consolelog("Event Exists");

              const isrsvp = await RSVP.findOne({
                By: req.body.Phone,
                Eid: Events._id,
              });
              if (isrsvp === null) {
                // consolelog("no RSVP yet");
                rsvpdata = await new RSVP({
                  By: req.body.Phone,
                  Eid: Events._id,
                  Status: req.body.status,
                });
                finaldata = await rsvpdata.save();
                // consolelog(" liked in like table ");
                UpdateEvents = await Event.findByIdAndUpdate(
                  id,
                  {
                    $push: { RSVPList: finaldata._id },
                  },
                  { new: true, useFindAndModify: false }
                )
                  .then(async (NewEvents) => {
                    const Notifydata = await new Notify({
                      Notification:
                        user.Name + " gave  RSVP status : " + req.body.status,
                      to: Events.Host,
                      by: user.Phone,
                      img: user.Pic,
                      Eid: Events._id,
                      MainCode: Events.MainCode,
                      date: req.body.date,
                    });
                    await Notifydata.save()
                      .then(() => {
                        //    console.log("Notify RSVP")
                        // console.log(Notifydata)
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                let rsvpid = isrsvp._id;
                finaldata = await RSVP.findByIdAndUpdate(
                  rsvpid,
                  {
                    Status: req.body.status,
                    By: req.body.Phone,
                  },
                  { new: true, useFindAndModify: false }
                );

                const Notifydata = await new Notify({
                  Notification:
                    user.Name +
                    " has changed RSVP status to : " +
                    req.body.status,
                  to: Events.Host,
                  by: user.Phone,
                  img: user.Pic,
                  Eid: Events._id,
                  MainCode: Events.MainCode,
                  date: req.body.date,
                });
                await Notifydata.save();
                res.json({ status: 1, finaldata });
              }
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ err: "invalid e_id" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({ err: "invalid e_id" });
      });
    // consolelog("user here");
    // consolelog(user);
  } catch (err) {
    console.log(err);
    res.json({ err: "invalid e_id" });
  }
};

exports.Like = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });

    const Events = await Event.findOne({ _id: req.body.id });
    let UpdateEvents = "";
    // console.log(Events._id);
    let id = Events._id;
    if (Events !== null) {
      // console.log("Event Exists");

      const isliked = await Likes.findOne({
        LikeBy: user.Phone,
        Eid: Events._id,
      });
      if (isliked === null) {
        // console.log("not liked yet");
        const Likesdata = await new Likes({
          LikeBy: user.Phone,
          Eid: Events._id,
        });
        const finaldata = await Likesdata.save();
        // console.log(" liked in like table ");
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            $push: { LikeList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        )
          .then(async () => {
            const Notifydata = await new Notify({
              Notification: user.Name + " liked your Event :" + Events.Name,
              to: [...Events.Host, ...Events.Participants],
              by: user.Phone,
              img: user.Pic,
              Eid: Events._id,
              MainCode: Events.MainCode,
              date: req.body.date,
            });
            await Notifydata.save();
            // console.log("updated success");
          })
          .catch((err) => {
            console.log(err);
          });
        if (UpdateEvents !== null) {
          // console.log(" Event Updated ");
        } else {
          // console.log(" Event not Updated ");
        }
      } else {
        // console.log(" liked already");
        Arraydata = await Events.LikeList.filter((like) => {
          like.LikeBy != req.user.Phone;
        });
        finaldata = await Likes.deleteOne({
          LikeBy: user.Phone,
          Eid: Events._id,
        });
        // console.log(finaldata);
        // console.log(" liked deleted");
        // console.log(finaldata);
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            LikeList: Arraydata,
          },
          { new: true, useFindAndModify: false }
        );
        if (UpdateEvents !== null) {
          // console.log(" Event Updated ");
        } else {
          // console.log(" Event not Updated ");
        }
      }

      res.json({ status: 1, UpdateEvents });
    } else {
      res.json({ err: "invalid e_id" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};

exports.Comment = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    const Events = await Event.findOne({ _id: req.body.id })
      .then(async (Events) => {
        let id = Events._id;
        const Commentsdata = await new Comments({
          CommentBy: user.Phone,
          Eid: Events._id,
          Comment: req.body.comment,
        });
        const finaldata = await Commentsdata.save();
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            $push: { CommentList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        )
          .then(async () => {
            const Notifydata = await new Notify({
              Notification: user.Name + " commented on  Event :" + Events.Name,
              to: [...Events.Participants, ...Events.Host],
              by: user.Phone,
              img: user.Pic,
              Eid: Events._id,
              MainCode: Events.MainCode,
              date: req.body.date,
            });
            await Notifydata.save();
          })
          .catch((err) => {
            console.log(err);
          });
        res.json({ status: 1, finaldata });
      })
      .catch((err) => {
        res.json({ err: "invalid e_id" });
      });
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};

exports.GetMyEvents = async (req, res) => {
  try {
    console.log("get events");
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    // consolelog(userdata);
    let Phone = userdata.Phone.split("+");
    // consolelog(Phone);
    let nocountryPhone = parseInt(Phone[1].substring(2));
    // consolelog(nocountryPhone);
    const Events = await Event.find({ Host: userdata.Phone })
      .sort({ Date: 1 })
      .populate("InvId LikeList CommentList RSVPList");

    console.log("+" + Phone[1], nocountryPhone);
    res.json({ status: "success", MyEvents: Events });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};

exports.GetInvitation = async (req, res) => {
  try {
    console.log("get events");
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    // consolelog(userdata);
    let Phone = userdata.Phone.split("+");
    // consolelog(Phone);
    let nocountryPhone = parseInt(Phone[1].substring(2));
    // consolelog(nocountryPhone);
    const Events = await Event.find({
      $or: [{ Participants: "+" + Phone[1] }, { Participants: nocountryPhone }],
    })
      .sort({ Date: 1 })
      .populate("InvId LikeList CommentList RSVPList");

    console.log("+" + Phone[1], nocountryPhone);
    res.json({ status: "success", Invitations: Events });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};

exports.DeleteEvents = async (req, res) => {
  const Events = await Event.find({ _id: req.body.id });
  const Notifydata = await new Notify({
    Notification: "Admin deleted this Event :" + Events.Name,
    to: [...Events.Participants, ...Events.Host],
    by: user.Phone,
    img: user.Pic,
    Eid: Events._id,
    MainCode: Events.MainCode,
    date: req.body.date,
  });
  await Notifydata.save();
  Event.deleteOne({ _id: req.body.id });
  res.json({ status: "success" });
};

exports.UpdateEvent = async (req, res) => {
  try {
    const query = { _id: req.body.id };
    switch (req.type) {
      case "Date": {
        const update = {
          $set: {
            Date: req.body.data,
          },
        };
      }
      case "Time": {
        const update = {
          $set: {
            Time: req.body.data,
          },
        };
      }
      case "Description": {
        const update = {
          $set: {
            Description: req.body.data,
          },
        };
      }
      case "Location": {
        const update = {
          $set: {
            Location: req.body.data,
          },
        };
      }
      case "Participants": {
        const update = {
          $set: {
            Participants: req.body.data,
          },
        };
      }
      case "Schedule": {
        const update = {
          $set: {
            Schedule: req.body.data,
          },
        };
      }
      case "VenueType": {
        const update = {
          $set: {
            VenueType: req.body.data,
          },
        };
      }
      case "file": {
        const update = {
          $set: {
            file: req.body.data,
          },
        };
      }
      case "filetype": {
        const update = {
          $set: {
            filetype: req.body.data,
          },
        };
      }
      case "GuestInvite": {
        const update = {
          $set: {
            GuestInvite: req.body.data,
          },
        };
      }
      case "Host": {
        const update = {
          $set: {
            Host: req.body.data,
          },
        };
      }
      case "filetype": {
        const update = {
          $set: {
            filetype: req.body.data,
          },
        };
      }

      default:
        const update = {};
        break;
    }

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Events = await Event.findOneAndUpdate(query, update, options);
    const Notifydata = await new Notify({
      Notification: "Admin Updated Event :" + Events.Name,
      to: [...Events.Participants],
      by: user.Phone,
      img: user.Pic,
      Eid: Events._id,
      MainCode: Events.MainCode,
      date: req.body.date,
    });
    await Notifydata.save()
      .then(() => {
        // consolelog("Notificaion added");
        return "Success";
      })
      .catch(() => {
        return "failed";
      });
    if (userdetails !== null) {
      res.JSON(userdetails);
    } else {
      res.JSON({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateParticipants = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    console.log(req.body.data);
    const Events = await Event.findOne({ _id: req.body.id });
    const query = { _id: req.body.id };
    console.log(Events);
    let newParticipants = [...req.body.data];
    newParticipants = await [...new Set(newParticipants)];
    newParticipants.filter((Participant) => {
      console.log(Participant, Events.Host);
      return !Events.Host.includes(Participant);
    });
    console.log(newParticipants);
    const update = {
      $set: {
        Participants: newParticipants,
      },
    };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Eventdata = await Event.findOneAndUpdate(query, update, options);
    if (Eventdata !== null) {
      res.json({ status: "success", Eventdata: Eventdata });
    } else {
      res.json({ status: "failed" });
    }
  } catch (err) {
    res.json({ status: "failed", err: err });
  }
};

exports.CreateGroup = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    const Events = await Event.findOne({ _id: req.body.eventCode });
    const group = new chatGroup({
      Name: req.body.Name,
      room: req.body.eventCode,
      Participants: req.body.Participants,
      Admin: user.Phone,
      GrpPhoto: req.body.file,
      Type: req.body.filetype,
      Uid: user._id,
    });
    await group.save();
    const userupdate = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { Groups: group._id },
      },
      { new: true, useFindAndModify: false }
    );
    const Notifydata = await new Notify({
      Notification: user.Name + " Created  Group :" + req.body.Name,
      to: req.body.Participants,
      by: user.Phone,
      img: user.Pic,
      Eid: Events._id,
      MainCode: Events.MainCode,
      date: req.body.date,
    });
    await Notifydata.save();
    res.json({ status1: "success", group });
  } catch (err) {
    res.json({ status1: "failed" });
  }
};
exports.GetGroups = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    let Groups = chatGroup.find({
      $or: [{ Participants: user.Phone }, { Admin: user.Phone }],
    });
    res.json({ status1: "success", Groups });
  } catch (err) {
    res.json({ status1: "failed" });
  }
};
exports.Addme = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findOne({ _id: req.user._id });

  console.log(req.body.code);
  const Eventdata = await Event.findOne({ code: req.body.code });

  if (Eventdata !== null) {
    if (
      Eventdata.Participants.includes(user.Phone) ||
      Eventdata.Host.includes(user.Phone)
    ) {
      res.json({ status: "success", err: "user Already exists" });
    } else {
      console.log(!Eventdata.Participants.includes(user.Phone));
      const updateEventdata = await Event.findByIdAndUpdate(
        Eventdata._id,
        {
          $push: { Participants: user.Phone },
        },
        { new: true, useFindAndModify: false }
      )
        .then(async () => {
          res.json({ status: "success", data: "added" });
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "fail", err: err });
        });
    }
  } else {
    res.json({ status: "fail", err: "event not found" });
  }
};
exports.Addmetoall = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findOne({ _id: req.user._id });

  if (req.body.maincode === "" || req.body.maincode === undefined) {
    res.json({ status: "fail", err: "event not found" });
  } else {
    await Event.find({ MainCode: req.body.maincode }).then(
      async (Eventdata) => {
        if (Eventdata !== null && Eventdata.length > 0) {
          for (let i = 0; i < Eventdata.length; i++) {
            if (Eventdata[i].EntryWay === "Code") {
              if (
                Eventdata[i].Participants.includes(user.Phone) ||
                Eventdata[i].Host.includes(user.Phone)
              ) {
                console.log("user Already exitst");
              } else {
                const updateEventdata = await Event.findByIdAndUpdate(
                  Eventdata[i]._id,
                  {
                    $push: { Participants: user.Phone },
                  },
                  { new: true, useFindAndModify: false }
                )
                  .then(async () => {
                    console.log("added participant");
                  })
                  .catch((err) => {
                    console.log(err);
                    res.json({ status: "fail", err: err });
                  });
              }
            }
          }
          res.json({ status: "success", data: "added" });
        } else {
          res.json({ status: "fail", err: "event not found" });
        }
      }
    );
  }
};

exports.geteventbyid = async (req, res) => {
  try {
    console.log("called");
    console.log(req.body.MainCode);
    const Events = await Event.find({ MainCode: req.body.MainCode }).populate(
      "InvId"
    );
    console.log(Events);
    if (!Events) {
      res.json({ Status: "failed", err: "no data found" });
    } else {
      console.log(Events);
      res.json({ Status: "success", Events: Events });
    }
  } catch (err) {
    res.json({ Status: "failed", err: err });
  }
};
exports.geteventbyidforinvite = async (req, res) => {
  try {
    console.log("called");
    console.log(req.body.MainCode);
    await Event.find({ MainCode: req.body.MainCode })
      .sort({ Date: 1, Time: 1 })
      .then(async (Events) => {
        console.log(Events);
        res.json({ Status: "success", Events: Events });
      })
      .catch((err) => {
        console.log(err);
        res.json({ Status: "failed", err: "no data found" });
      });
    console.log(Events);
  } catch (err) {
    console.log(err);
    res.json({ Status: "failed", err: err });
  }
};
exports.geteventbyidforEvent = async (req, res) => {
  try {
    console.log("called");
    console.log(req.body.Name);
    console.log(req.body.Code);
    await Event.find({ MainCode: req.body.maincode, code: req.body.Code })
      .then(async (Eventdata) => {
        res.json({ Status: "success", Events: Eventdata });
      })
      .catch((err) => {
        console.log(err);
        res.json({ Status: "failed", err: "no data found" });
      });
  } catch (err) {
    console.log(err);
    res.json({ Status: "failed", err: err });
  }
};
exports.UpdateEventsdata = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findOne({ _id: req.user._id });
  console.log(req.body);

  await Event.findByIdAndUpdate(
    req.body.id,
    {
      Name: req.body.Eventdata.Name,
      Date: req.body.Eventdata.Date,
      Time: req.body.Eventdata.Time,
      Description: req.body.Eventdata.Description,
      Location: req.body.Eventdata.Location,
      Link: req.body.Eventdata.Link,
      VenueType: req.body.Eventdata.VenueType,
    },
    { new: true, useFindAndModify: false }
  )
    .then(async (UpdateEvents) => {
      res.json({ status: "success", data: UpdateEvents });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "fail", err: err });
    });
};
exports.addAlbums = async (req, res) => {
  try {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    UpdateInvitaion = await Invitaion.findByIdAndUpdate(
      req.body._id,
      { Album: req.body.Album },
      options
    );
    res.json({ status: "Success", data: UpdateInvitaion });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};

exports.likecomment = async (req, res) => {
  let likeby = [];
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  await User.findOne({ _id: req.user._id })
    .then(async (user) => {
      console.log(user);
      Comments.findById(req.body.id)
        .then(async (currentCommet) => {
          likeby = [...currentCommet.likeby];
          if (currentCommet.likeby.includes(user.Phone) === true) {
            likeby.filter((like) => {
              return like !== user.Phone;
            });
          } else {
            Comments.findByIdAndUpdate(
              req.body.id,
              {
                likeby: [...likeby, user.Phone],
              },
              { new: true, useFindAndModify: false }
            )
              .then((updateComments) => {
                res.json({ status: "success", updateComments: updateComments });
              })
              .catch((err) => {
                console.log(err);
                res.json({ status: "failed", err: err });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "failed", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "failed", err: err });
    });
  console.log(req.body.data);
};

exports.deleteInvite = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  await User.findOne({ _id: req.user._id })
    .then(async (user) => {
      console.log("user Found");
      await Event.find({ MainCode: req.body.maincode })
        .then(async (Eventdata) => {
          console.log("Eventdata");
          console.log(Eventdata);
          let ishostcount = 0;
          for (let i = 0; i < Eventdata.length; i++) {
            if (Eventdata[i].Host.includes(user.Phone)) {
              console.log("user is admin");
              ishostcount++;
              await Event.deleteOne({ _id: Eventdata[i]._id }).then(() => {
                console.log("deleted event :" + Eventdata[i]._id);
              });
            } else {
              let newParticipant = [];
              Eventdata[i].Participants.map(async (part) => {
                if (
                  part !== user.Phone &&
                  (typeof part === "string" || typeof part === "number")
                ) {
                  console.log(part, user.Phone);
                  await newParticipant.push(part);
                }
              });
              console.log("newParticipant");
              console.log(newParticipant);
              await Event.findByIdAndUpdate(
                Eventdata[i]._id,
                {
                  Participants: newParticipant,
                },
                { new: true, useFindAndModify: false }
              ).then((newEventdata) => {
                console.log("newEventdata");
                console.log("Event deleted as Participant");
                console.log(newEventdata);
              });
            }
            if (i === Eventdata.length - 1) {
              if (ishostcount === Eventdata.length) {
                console.log("admins delete");
                await Invitaion.deleteOne({ _id: req.body.maincode }).then(
                  () => {
                    res.json({ status: "success" });
                  }
                );
              } else {
                res.json({ status: "success" });
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "failed", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "failed", err: err });
    });
};
exports.AddHost = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  await User.findOne({ _id: req.user._id })
    .then(async (user) => {
      console.log(user);
      await Event.findOne({ _id: req.body._id })
        .then(async (Eventdata) => {
          let Host = Eventdata.Host;
          if (Host.includes(user.Phone)) {
            let newParticipants = Eventdata.Participants.filter(
              (Participant) => {
                return Participant !== req.body.newHost;
              }
            );

            await Event.findByIdAndUpdate(
              Eventdata._id,
              {
                Participants: [...new Set(newParticipants)],
                Host: [...new Set([...Host, req.body.newHost])],
              },
              { new: true, useFindAndModify: false }
            )
              .then(async (Eventdata) => {
                const Notifydata = await new Notify({
                  Notification: "Admin made you host Post ",
                  to: [...Eventdata.Participants, req.body.newHost],
                  by: user.Phone,
                  img: user.Pic,
                  Eid: Eventdata._id,
                  MainCode: Eventdata.MainCode,
                  date: req.body.date,
                });
                await Notifydata.save();
                res.json({ status: "Success" });
              })
              .catch((err) => {
                console.log(err);
                res.json({ status: "failed", err: err });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "failed", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "failed", err: err });
    });
};

exports.RemoveHost = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  await User.findOne({ _id: req.user._id })
    .then(async (user) => {
      console.log(user);
      await Event.findOne({ _id: req.body._id })
        .then(async (Eventdata) => {
          console.log(Eventdata);
          let Host = Eventdata.Host;
          let Participants = Eventdata.Participants;
          if (Host.includes(user.Phone)) {
            let newHosts = Eventdata.Host.filter((host) => {
              return host !== req.body.newHost;
            });
            await Event.findByIdAndUpdate(
              Eventdata._id,
              {
                Participants: [...new Set([...Participants, req.body.newHost])],
                Host: [...new Set(newHosts)],
              },
              { new: true, useFindAndModify: false }
            )
              .then(async (Eventdata) => {
                const Notifydata = await new Notify({
                  Notification: "You are no longer a host ",
                  to: [...Eventdata.Participants, req.body.newHost],
                  by: user.Phone,
                  img: user.Pic,
                  Eid: Eventdata._id,
                  MainCode: Eventdata.MainCode,
                  date: req.body.date,
                });
                await Notifydata.save();
                res.json({ status: "Success" });
              })
              .catch((err) => {
                console.log(err);
                res.json({ status: "failed", err: err });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "failed", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "failed", err: err });
    });
};

exports.UpdateSchedule = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(
      req.body.eid,
      {
        Schedule: req.body.Schedule,
      },
      { new: true, useFindAndModify: false }
    )
      .then(async () => {
        res.json({ status: "success" });
      })
      .catch((err) => {
        res.json({ status: "failed", err: err });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
exports.UpdateStory = async (req, res) => {
  try {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    await Invitaion.findByIdAndUpdate(
      req.body.id,
      {
        Story: req.body.story,
      },
      options
    ).then(() => {
      res.json({ status: "success" });
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
exports.ListallGuest = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    let Phone = userdata.Phone.split("+");
    let nocountryPhone = parseInt(Phone[1].substring(2));
    let allGuest = [];
    let allGuestNumber = [];
    const Events = await Event.find({
      $or: [
        { Participants: "+" + Phone[1] },
        { Participants: nocountryPhone },
        { Host: "+" + Phone[1] },
        { Host: nocountryPhone },
      ],
    })
      .select("Participants Host")
      .then(async (ParticipantCollection) => {
        // console.log(ParticipantCollection);
        // let ParticipantCollectiondata = [...ParticipantCollection, ParticipantCollection.Host];
        // console.log(ParticipantCollectiondata);
        for (let i = 0; i < ParticipantCollection.length; i++) {
          ParticipantCollection.map(async (participant) => {
            participant.Participants.map(async (numb) => {
              await allGuest.push(numb);
            });
            participant.Host.map(async (numb) => {
              await allGuest.push(numb);
            });
          });
        }
        allGuest = [...new Set(allGuest)];
        // Participant.map(async (signleparticipant, index) => {

        //   console.log(...signleparticipant.Participants)

        //   allGuestNumber = [...allGuestNumber, ...signleparticipant.Participants];
        //   console.log(allGuestNumber);
        //   console.log(index)
        // });
        // console.log(allGuest);

        await User.find({
          Phone: { $in: allGuest },
        })
          .select("Name Phone Pic")
          .then((userdata) => {
            res.json({
              status: "success",
              allGuest: allGuest,
              availableGuest: userdata,
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({ status: "failed", err: err });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: "failed", err: err });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
exports.listGifts = async (req, res) => {
  try {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    let endpoint = "";
    if (req.body.category !== "") {
      endpoint = "products?category=" + req.body.category;
    } else {
      endpoint = "products";
    }
    wocomm.getgifts(endpoint, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
exports.deletesEvents = async (req, res) => {
  try {
    Events.deleteMany({ Name: "Test", Date: "2021-09-11" })
      .then(() => {
        res.json({ status: "success" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: "failed", err: err });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};

exports.Notifyall = async (req, res) => {
  let eventToday = [];

  let date2dayslater = "";
  let date3dayslater = "";

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  datetoday = `${year}-${month}-${day}`;
  date2dayslater = `${year}-${month}-${day + 2}`;
  date3dayslater = `${year}-${month}-${day + 3}`;
  console.log(datetoday, date2dayslater, date3dayslater);

  User.find()
    .then(async (users) => {
      await users.map(async (user) => {
        //   await watsapp.NoNotification({ phone: user.Phone });

        //reminder
        await Event.findOne({ Date: datetoday, Participants: user.Phone })
          .select("Name Date Time Host file MainCode")
          .sort({ Time: 1 })
          .then(async (Eventdata) => {
            if (Eventdata === undefined || Eventdata === null) {
              //      console.log("no event today")
            } else if (
              Eventdata.length == 1 &&
              eventToday[user.Phone] === undefined
            ) {
              nonotify = false;
              //console.log("Eventdata", Eventdata)
              await watsapp.eventRemainder({
                phone: user.Phone,
                file: Eventdata.file,
                msg:
                  "You have an Invitation of " +
                  Eventdata.Name +
                  " from " +
                  Eventdata.Host[0] +
                  " for today at " +
                  Eventdata.Time,
                link:
                  "https://mobillyinvite.com/MyInvitations/" +
                  Eventdata.MainCode +
                  " ",
              });
              // console.log(1241, {
              //   phone: user.Phone,
              //   file: Eventdata.file,
              //   msg: "You have an Invitation of " + Eventdata.Name + " from " + Eventdata.Host[0] + " for today at " + Eventdata.Time,
              //   link: "https://mobillyinvite.com/MyInvitations/" + Eventdata.MainCode
              // });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        //rsvp
        await Event.findOne({ Date: date2dayslater, Participants: user.Phone })
          .select("RSVPList Name Date Time Host file MainCode")
          .populate("RSVPList")
          .sort({ Time: 1 })
          .then(async (Eventdata) => {
            if (Eventdata === undefined || Eventdata === null) {
              //  console.log("no rsvp dude")
            } else if (
              Eventdata !== null &&
              Eventdata.RSVPList !== null &&
              Eventdata.RSVPList !== undefined
            ) {
              //console.log("Eventdata", Eventdata)
              nonotify = false;

              Eventdata.RSVPList.map(async (rsvp) => {
                // console.log(rsvp)
                if (rsvp.Status === "May Be" && rsvp.By === user.Phone) {
                  await watsapp.nORsvp({
                    phone: user.Phone,
                    file: Eventdata.file,
                    msg: "You haven't given RSVP for Event " + Eventdata.Name,
                    link:
                      "https://mobillyinvite.com/MyInvitations/" +
                      Eventdata.MainCode +
                      " ",
                  });
                  // console.log(1265, {
                  //   phone: user.Phone,
                  //   file: Eventdata.file,
                  //   msg: "You haven't given RSVP for Event " + Eventdata.Name,
                  //   link: "https://mobillyinvite.com/MyInvitations/" + Eventdata.MainCode
                  // })
                } else {
                  //   console.log("no rsvp dude")
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        await Event.findOne({ Date: date3dayslater, Participants: user.Phone })
          .select("Participants Name Date Time Host file MainCode")
          .sort({ Time: 1 })
          .then(async (Eventdata) => {
            if (Eventdata === undefined || Eventdata === null) {
              //console.log("no gift dude")
            } else if (Eventdata !== null) {
              nonotify = false;
              await watsapp.giftAvailable({
                phone: user.Phone,
                file: Eventdata.file,
                msg: "You can buy Gifts for Event " + Eventdata.Name,
                link:
                  "https://mobillyinvite.com/MyInvitations/" +
                  Eventdata.MainCode +
                  " ",
              });
              // console.log(1290, {
              //   phone: user.Phone,
              //   file: Eventdata.file,
              //   msg: "You can buy Gifts for Event " + Eventdata.Name,
              //   link: "https://mobillyinvite.com/MyInvitations/" + Eventdata.MainCode + " ",
              // })
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
      console.log("done");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.clearall = async (req, res) => {
  User.find()
    .then(async (users) => {
      await users.map(async (user) => {
        await watsapp.NoNotification({ phone: user.Phone });
      });
      return 1;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.AuthInvite = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const userdata = await User.findOne({ _id: req.user._id });
    Invitaion.find({ _id: req.body._id }).then(async (Inv) => {
      let authdata = [];
      if (Inv.AuthNums === undefined) {
        authdata = [userdata.Phone];
      } else {
        authdata = Inv.AuthNums;
        authdata.push(userdata.Phone);
        authdata = [...new Set(authdata)];
      }

      await Invitaion.findByIdAndUpdate(
        req.body._id,
        {
          AuthNums: authdata,
        },
        options
      )
        .then((Invitaion) => {
          res.json({ status: "success", Invitaion });
        })
        .catch((err) => {
          console.log(err);
          res.json({ status: "failed", err: err });
        });
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};
exports.getGift = async (req, res) => {
  try {
    const commonParameters = {
      AccessKey: "AKIATTE4NN3GIGABC5AC",
      SecretKey: "nMfUSjjkihouGuPjrm8ln6YuK8na5p7EiCR9CL1t",
      PartnerTag: "minvite03-21", // yourtag-20
      PartnerType: "Associates", //  Default value is Associates.
      Marketplace: "www.amazon.in", // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
    };

    const requestParameters = {
      Keywords: req.body.queryString,
      ItemCount: 20,
      Resources: [
        "Images.Primary.Medium",
        "ItemInfo.Title",
        "Offers.Listings.Price",
      ],
    };

    amazonPaapi
      .SearchItems(commonParameters, requestParameters)
      .then((data) => {
        // do something with the success response.
        console.log(data);
        res.json({ status: "success", data: data });
      })
      .catch((error) => {
        // catch an error.
        console.log(error);
      });
  } catch (error) {
    res.json({ status: "failed", err: err });
    console.log(error);
  }
};

exports.updateHostSelectedMenu = async (req, res) => {
  console.log(req.body);
  await Events.findByIdAndUpdate(
    req.body.id,
    {
      HostSelectedMenu: req.body.MenuOption,
    },
    { new: true, useFindAndModify: false }
  )
    .then(async (UpdateEvents) => {
      res.json({ status: "success", data: UpdateEvents });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "fail", err: err });
    });
};

exports.updateHostConnectInfo = async (req, res) => {
  console.log(req.body);
  await Events.findByIdAndUpdate(
    req.body.id,
    {
      HostConnectInfo: req.body.HostConnectInfo,
    },
    { new: true, useFindAndModify: false }
  )
    .then(async (UpdateEvents) => {
      res.json({ status: "success", data: UpdateEvents });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "fail", err: err });
    });
};

exports.updateRecommendedGifts = async (req, res) => {
  console.log(req.body);
  await Events.findByIdAndUpdate(
    req.body.id,
    {
      RecommendedGifts: req.body.RecommendedGifts,
    },
    { new: true, useFindAndModify: false }
  )
    .then(async (UpdateEvents) => {
      res.json({ status: "success", data: UpdateEvents });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "fail", err: err });
    });
};
