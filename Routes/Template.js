const router = require("express").Router();
const templatecontroller = require("../Controllers/Templates");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/gettemplate").post(verifytoken, templatecontroller.getTemplate);
router.route("/addtemplate").post(verifytoken, templatecontroller.addTemplate);
module.exports = router;