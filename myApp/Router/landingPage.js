const express = require("express");
const { landingPage } = require("../controller/landingPageController");
const landingPageRouter = express.Router();

landingPageRouter.route('/').get(landingPage);

module.exports = landingPage

