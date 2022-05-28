const Post = require("../Models/Posts");
const Likes = require("../Models/Likes");
const Comments = require("../Models/Comments");
const Event = require("../Models/Events");
const Invitaion = require("../Models/Invitation");
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const Notify = require("../Models/Notify");
exports.addPost = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    const invitaion = await Invitaion.findById(req.body.id);
    let id = invitaion._id;
    const Postdata = await new Post({
      by: req.body.by,
      fileurl: req.body.furl,
      filetype: req.body.type,
      Eid: id,
      tags: req.body.tags,
      caption: req.body.caption,
      date: req.body.date
    });
    await Postdata.save().then(async (Postdata) => {
      await Invitaion.findByIdAndUpdate(
        id,
        {
          $push: { PostList: Postdata._id },
        },
        { new: true, useFindAndModify: false }
      ).then(async (Invitaion) => {
        await Event.findOne({ eventCode: Invitaion._id + "_" + 0 }).then(async (Events) => {
          const Notifydata = await new Notify({
            Notification:
              user.Name + " Added A Post to Feed",
            to: Events.Participants,
            by: user.Phone,
            img: user.Pic,
            Eid: Events.MainCode + "_" + 0,
            MainCode: Events.MainCode,
            date: req.body.date
          });
          await Notifydata.save()
          res.json({ status: "success", Postdata });
        })
      }).catch(err => { console.log(err); res.json({ status: 'err', err: err }) })
    }).catch(err => { console.log(err); res.json({ status: 'err', err: err }) });

  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};

exports.LikePost = async (req, res) => {
  try {
    console.log(1)
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    let Likeadata = {};
    let UpdateEvents = {};
    await Post.findById(req.body.id).then(async (Postdata) => {
      console.log(2)
      if (Postdata.LikeList === undefined || Postdata.LikeList.length === 0) {
        console.log(3)
        Likeadata = await new Likes({
          LikeBy: req.body.by,
          Pid: Postdata._id,
        });
        await Likeadata.save().then(async () => {
          console.log(4)
          await Post.findByIdAndUpdate(
            Postdata._id,
            {
              $push: { LikeList: Likeadata._id },
            },
            { new: true, useFindAndModify: false }
          ).then(async () => {
            console.log(5)
            await Event.find({ eventCode: req.body.id + "_" + 0 }).then(async (Events) => {
              const Notifydata = await new Notify({
                Notification:
                  user.Name + " Liked your Post ",
                to: [Postdata.by],
                by: user.Phone,
                img: user.Pic,
                Eid: Postdata.Eid,
                MainCode: req.body.MainCode,
                date: req.body.date
              });
              await Notifydata.save().then(async () => {
                res.json({ status: "Success", UpdateEvents: Events });
              }).catch((err) => {
                console.log(err)
                res.json({ status: "fail", err: err });
              });
            }).catch((err) => {
              console.log(err)
              res.json({ status: "fail", err: err });
            });;
          }).catch((err) => {
            console.log(err)
            res.json({ status: "fail", err: err });
          });
        }).catch((err) => {
          console.log(err)
          res.json({ status: "fail", err: err });
        });;
      } else {
        let isliked = false;
        Postdata.LikeList.map((singlelike) => {
          if (singlelike.LikeBy === req.body.by) {
            isliked = true;
          }
        });
        if (isliked === true) {
          let Arraydata = Postdata.LikeList.filter((like) => {
            like.LikeBy != req.body.by;
          });

          Likeadata = Likes.deleteOne({
            LikeBy: req.body.by,
          });
          UpdateEvents = Post.findByIdAndUpdate(
            id,
            {
              LikeList: Arraydata,
            },
            { new: true, useFindAndModify: false }
          );
          res.json({ status: "Success", UpdateEvents });
        } else {
          Likeadata = await new Likes({
            LikeBy: req.body.by,
            Pid: Postdata._id,
          });
          await Likeadata.save().then(async () => {
            console.log(4)
            await Post.findByIdAndUpdate(
              Postdata._id,
              {
                $push: { LikeList: Likeadata._id },
              },
              { new: true, useFindAndModify: false }
            ).then(async () => {
              console.log(5)
              await Event.find({ eventCode: req.body.id + "_" + 0 }).then(async (Events) => {
                const Notifydata = await new Notify({
                  Notification:
                    user.Name + " Liked your Post ",
                  to: [Postdata.by],
                  by: user.Phone,
                  img: user.Pic,
                  Eid: Postdata.Eid,
                  MainCode: req.body.MainCode,
                  date: req.body.date
                });
                await Notifydata.save().then(async () => {
                  res.json({ status: "Success", UpdateEvents: Events });
                }).catch((err) => {
                  console.log(err)
                  res.json({ status: "fail", err: err });
                });
              }).catch((err) => {
                console.log(err)
                res.json({ status: "fail", err: err });
              });;
            }).catch((err) => {
              console.log(err)
              res.json({ status: "fail", err: err });
            });
          }).catch((err) => {
            console.log(err)
            res.json({ status: "fail", err: err });
          });;
        }
      }
    }).catch((err) => {
      console.log(err)
      res.json({ status: "fail", err: err });
    });
  } catch (err) {
    console.log(err)
    res.json({ status: "fail", err: err });
  };
}


exports.getpost = async (req, res) => {
  try {
    console.log(req.body)
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const userdata = await User.findOne({ _id: req.user._id });
    console.log(userdata);
    let Phone = userdata.Phone.split("+");
    let nocountryPhone = parseInt(Phone[1].substring(2));
    console.log("nocountryPhone", nocountryPhone);
    const Posts = await Post.find({
      Eid: req.body.maincode,
    }).populate('CommentList LikeList').sort({ date: -1 })
    res.json({ status: "success", Posts: Posts });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err: err });
  }
};

exports.commentonPost = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    await Post.findOne({ _id: req.body.id }).then(async (Postdata) => {
      let id = Postdata._id;
      const Commentsdata = await new Comments({
        CommentBy: req.body.by,
        Pid: id,
        Comment: req.body.comment,
      });
      await Commentsdata.save().then(async (finaldata) => {
        await Post.findByIdAndUpdate(
          id,
          {
            $push: { CommentList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        ).then(async (Postdata) => {
          const Notifydata = await new Notify({
            Notification:
              user.Name + " Commented on your  Post ",
            to: Postdata.by,
            by: user.Phone,
            img: user.Pic,
            Eid: Postdata.Eid,
            MainCode: req.body.MainCode,
            date: req.body.date
          });
          await Notifydata.save()
          res.json({ status: "success", Posts: Postdata });
        }).catch(err => {
          console.log(err)
          res.json({ status: "fail", err: err });
        });
      }).catch(err => {
        console.log(err)
        res.json({ status: "fail", err: err });
      });;
    }).catch(err => {
      console.log(err)
      res.json({ status: "fail", err: err });
    });

  } catch (err) {
    res.json({ status: "fail", err: err });
  }
}


exports.getpostcomments = async (req, res) => {
  try {
    // console.log("id");
    // console.log(req.body.id);
    const Postdata = await Comments.find({ Pid: req.body.id });
    // console.log(Postdata);
    res.json({ status: "success", data: Postdata });
  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};
exports.getEventcomments = async (req, res) => {
  try {
    // console.log("id");
    // console.log(req.body.id);
    const Postdata = await Comments.find({ Eid: req.body.id });
    // console.log(Postdata);
    res.json({ status: "success", data: Postdata });
  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};
exports.likepostcomments = async (req, res) => {
  try {
    const comment = await Comments.findById(req.body.id);
    if (comment.likeby) {
      if (comment.likeby.includes(req.body.user)) {
        let likelist = comment.likeby.filter((like) => {
          return like !== req.body.user;
        });
        await Comments.findByIdAndUpdate(
          req.body.id,
          { likeby: likelist },
          { new: true, useFindAndModify: false }
        );
      } else {
        let likelist = comment.likeby.push(req.body.user);
        await Comments.findByIdAndUpdate(
          req.body.id,
          { likeby: likelist },
          { new: true, useFindAndModify: false }
        );
      }
    } else {
      await Comments.findByIdAndUpdate(
        req.body.id,
        { likeby: [req.body.user] },
        { new: true, useFindAndModify: false }
      );
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};
exports.deletePost = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  await User.findOne({ _id: req.user._id }).then(async (user) => {
    // console.log(user)
    // await Event.find({ maincode: req.body._id }).then(async (Eventdata) => {
    //   console.log(Eventdata)
    //   await Post.findOne({ Eid: Eventdata._id }).then(async (Postdata) => {
    //     console.log(Postdata)
    Post.deleteOne({ _id: req.body._id }).then(async () => {
      res.json({ status: "success" });
    }).catch(err => {
      console.log(err);
      res.json({ status: "failed", err: err });
    })

  }).catch(err => {
    console.log(err);
    res.json({ status: "failed", err: err });
  });
  // }).catch(err => {
  //   console.log(err);
  //   res.json({ status: "failed", err: err });
  // });

  // }).catch(err => {
  //   console.log(err);
  //   res.json({ status: "failed", err: err });
  // });
  console.log(req.body.data);
}