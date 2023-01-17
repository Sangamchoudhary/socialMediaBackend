const express = require("express");
const { protectRoute } = require("../controller/authController");
const { follow } = require("../controller/userController");

const userUtilityRouter = express.Router();

userUtilityRouter.use(protectRoute);

userUtilityRouter.route("/:id").post(follow);

module.exports = userUtilityRouter;
