const express = require("express");
const { protectRoute } = require("../controller/authController");
const { unfollow } = require("../controller/userController");

const userUtilityRouter = express.Router();

userUtilityRouter.use(protectRoute);

userUtilityRouter.route("/:id").post(unfollow);

module.exports = userUtilityRouter;
