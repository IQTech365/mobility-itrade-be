const router = require("express").Router();
const verifytoken = require("../Middleware/IsAuthenticated.js");
const AdminController = require("../Controllers/AdminController");
router.route("/getGift").get(verifytoken, AdminController.getGift);
module.exports = router;