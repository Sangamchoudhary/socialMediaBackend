const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const db_link =
  "mongodb+srv://admin:sangam9069@cluster0.0p8zc6s.mongodb.net/?retryWrites=true";

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/config.env" });
}

app.use(express.json()); // middle  ware
app.listen(3000);
app.use(cookieParser());


// for log in
const authenticateRouter = require("./Router/authenticateRouter");
app.use("/api/authenticate", authenticateRouter); // base url, router-to-use

// for getting a single user
const userRouter = require("./Router/userRouter");
app.use("/api/user", userRouter); // base url, router-to-use

// for follow a user
const userFollowRouter = require("./Router/userFollowRouter");
app.use("/api/follow", userFollowRouter); // base url, router-to-use

// for unfollow a user
const userUnfollowRouter = require("./Router/userUnfollowRouter");
app.use("/api/unfollow", userUnfollowRouter); // base url, router-to-use

// for create, delete and get a single post
const postsRouter = require("./Router/postsRouter");
app.use("/api/posts", postsRouter); // base url, router-to-use

// for like, unlike, comment and get all post
const postUtilityRouter = require("./Router/postUtilityRouter");
app.use("/api", postUtilityRouter); // base url, router-to-use

// for landing page
const landingPage = require("./Router/landingPage");
app.use("/", landingPage); // base url, router-to-use

module.exports = app;
