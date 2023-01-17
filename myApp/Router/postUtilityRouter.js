const express = require("express");
const { protectRoute } = require("../controller/authController");
const {
  likePost,
  unlikePost,
  commentOnPost,
  getAllPost,
} = require("../controller/postController");
const postUtilityRouter = express.Router();

postUtilityRouter.use(protectRoute);

postUtilityRouter.route("/like/:id").post(likePost);
postUtilityRouter.route("/unlike/:id").post(unlikePost);
postUtilityRouter.route("/comment/:id").post(commentOnPost);

postUtilityRouter.route("/all_posts").get(getAllPost);

module.exports = postUtilityRouter;
