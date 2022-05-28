const router = require("express").Router();
const authcontroller = require("../Controllers/AuthController.js");
router.route("/login").post(authcontroller.login);
router.route("/send-otp").post(authcontroller.sendotp);
router.route("/verify-otp").post(authcontroller.verifyotp);
router.route("/userinfo").post(authcontroller.userdetails);
router.route("/getuserdetails").post(authcontroller.getuserdetails);
router.route("/getalluserdetails").post(authcontroller.getalluserdetails);
router.route("/getstat").get(authcontroller.getStats);
router.route("/verify").get(authcontroller.verify);

module.exports = router;
