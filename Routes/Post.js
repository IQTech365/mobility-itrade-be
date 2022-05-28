const postController = require("../Controllers/PostsController");
const verifytoken = require("../Middleware/IsAuthenticated.js");
const router = require("express").Router();
router.route("/add").post(verifytoken, postController.addPost);
router.route("/like").post(verifytoken, postController.LikePost);
router
  .route("/getpostcomments")
  .post(verifytoken, postController.getpostcomments);
router
  .route("/geteventcomments")
  .post(verifytoken, postController.getEventcomments);
router.route("/comment").post(verifytoken, postController.commentonPost);
router.route("/getposts").post(verifytoken, postController.getpost);
router.route("/delete").post(verifytoken, postController.deletePost);
module.exports = router;
