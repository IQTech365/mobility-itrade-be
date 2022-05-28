const Chats = require("../Models/Chats");
const Chatgroups = require("../Models/ChatGroups");
const User = require("../Models/User");
const ChatGroups = require("../Models/ChatGroups");
let options = { upsert: true, new: true, setDefaultsOnInsert: true };
let users = [];
let Phone = "";
let nocountryPhone = "";
let Chatgroup = {};
let grps = [];
let grpdetail = {};
let grpcpy = [];
const socketmesage = async (socket, io) => {
  console.log("init");
  socket.emit("init", "connected");
  users = [];
  socket.on("connectit", () => {
    let Phone = "";
    let nocountryPhone = "";
    let Chatgroup = {};
    let grps = [];
    let grpdetail = {};
  });
  socket.once("rooms", async (User) => {
    console.log("try to join room");
    if (User !== undefined && User.Phone) {
      if (!users.includes(User.Phone)) {
        users.push(User.Phone);
        // console.log(users);
        Phone = User.Phone.split("+");
        // console.log(Phone[1]);
        nocountryPhone = parseInt(Phone[1].substring(2));
        chatgroup = await ChatGroups.find({
          $or: [{ Participants: User.Phone }, { Participants: nocountryPhone }],
        });

        if (!grps[User.Phone] || grps[User.phone] === []) {
          console.log("join all rooms");
          chatgroup.map((grp) => {
            let grpdetail = { name: grp.Name, rname: grp.room };
            if (grps[User.Phone] && grps[User.Phone].includes(grp.room)) {
            } else {
              grpcpy.push(grp.room);
              socket.join(grp.room);
              console.log(User.Phone + "joined" + grp.room);
            }
          });
          grps[User.Phone] = grpcpy;
          console.log(grps);
        } else {
          console.log(grps);
        }
      }
    }
  });
  socket.on("message", async (msg) => {
    // console.log("got msg at server");

    console.log("msg");
    const finaldata = await new Chats({
      sender: msg.sender,
      content: msg.content,
      type: msg.type,
      room: msg.room,
      grp: msg._id,
    });
    await finaldata.save();
    Chatgroup = await Chatgroups.findByIdAndUpdate(
      msg._id,
      {
        $push: { chats: finaldata._id },
      },
      { new: true, useFindAndModify: false }
    )
      .then(() => {
        console.log(msg.room);
      })
      .catch((err) => {
        console.log(err);
      });
    socket.to(msg.room).broadcast.emit("msg_saved", finaldata);
  });
  socket.on("disconnect", () => {
    user = [];
    grps = [];
  });
};
exports.socketmesage = socketmesage;
