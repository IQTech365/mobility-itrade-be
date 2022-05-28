const router = require("express").Router();
const eventcontroller = require("../Controllers/NotificatonController");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router
  .route("/getNotifications")
  .get(verifytoken, eventcontroller.GetNotifications);
router
  .route("/sendNotifications")
  .post(verifytoken, eventcontroller.Notifithem);

module.exports = router;
