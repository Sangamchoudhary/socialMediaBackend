const express = require("express");
const { protectRoute } = require("../controller/authController");
const { getUser } = require("../controller/userController");
const userRouter = express.Router();

userRouter.use(protectRoute);

userRouter.route("/").get(getUser);

module.exports = userRouter;
