const express = require("express");
const authenticateRouter = express.Router();
const { login } = require("../controller/authController");

authenticateRouter.route("/login").post(login);

module.exports = authenticateRouter;