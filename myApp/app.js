const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

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
