const router = require("express").Router();
const Chatroomcontroller = require("../Controllers/ChatController");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/getmyrooms").get(verifytoken, Chatroomcontroller.GetGroups);
router.route("/createroom").post(verifytoken, Chatroomcontroller.CreateGroup);
router.route("/getchat").post(verifytoken, Chatroomcontroller.GetChats);
module.exports = router;
