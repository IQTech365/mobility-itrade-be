const router = require("express").Router();
const eventcontroller = require("../Controllers/EventController.js");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/create").post(verifytoken, eventcontroller.create);
router.route("/getmyInvitaion").get(verifytoken, eventcontroller.GetInvitation);
router.route("/getmyEvents").get(verifytoken, eventcontroller.GetMyEvents);
router.route("/update").post(verifytoken, eventcontroller.create);
router.route("/like").post(verifytoken, eventcontroller.Like);
router.route("/comment").post(verifytoken, eventcontroller.Comment);
router.route("/rsvp").post(verifytoken, eventcontroller.RSVP);
router.route("/addme").post(verifytoken, eventcontroller.Addme);
router.route("/addmetoall").post(verifytoken, eventcontroller.Addmetoall);
router.route("/addalbum").post(verifytoken, eventcontroller.addAlbums);
router
  .route("/updateevents")
  .post(verifytoken, eventcontroller.UpdateEventsdata);
router
  .route("/UpdateParticipants")
  .post(verifytoken, eventcontroller.UpdateParticipants);
router.route("/viewinvitation").post(verifytoken, eventcontroller.geteventbyid);
router.route("/viewinvite").post(eventcontroller.geteventbyidforinvite);
router.route("/viewEvent").post(eventcontroller.geteventbyidforEvent);
router.route("/likecomment").post(verifytoken, eventcontroller.likecomment);
router.route("/delete").post(verifytoken, eventcontroller.deleteInvite);
router.route("/addHost").post(verifytoken, eventcontroller.AddHost);
router.route("/removeHost").post(verifytoken, eventcontroller.RemoveHost);

router.route("/updateSchedule").post(verifytoken, eventcontroller.UpdateSchedule);
router.route("/updateStory").post(verifytoken, eventcontroller.UpdateStory);
router.route("/ListallGuest").post(verifytoken, eventcontroller.ListallGuest);
router.route("/ListGifts").post(verifytoken, eventcontroller.listGifts);
router.route("/deletesEvents").post(verifytoken.apply, eventcontroller.deletesEvents);
router.route("/AuthInvite").post(verifytoken, eventcontroller.AuthInvite);
router.route("/getGift").post(verifytoken, eventcontroller.getGift);
router.route("/updateHostMenuOption").post(verifytoken, eventcontroller.updateHostSelectedMenu);
router.route("/updateHostConnectInfo").post(verifytoken, eventcontroller.updateHostConnectInfo);
router.route("/updateRecommendedGifts").post(verifytoken, eventcontroller.updateRecommendedGifts);
module.exports = router;
