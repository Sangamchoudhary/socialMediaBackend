const express = require("express");
const { protectRoute } = require("../controller/authController");
const postsRouter = express.Router();
const {
  createPost,
  deletePost,
  getSinglePost,
} = require("../controller/postController");

postsRouter.use(protectRoute);

postsRouter.route("/").post(createPost);
postsRouter.route("/:id").delete(deletePost).get(getSinglePost);

module.exports = postsRouter;
