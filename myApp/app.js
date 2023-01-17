const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); // middle  ware
app.listen(3000);
app.use(cookieParser());

// mini - app1 [user]
const authenticateRouter = require("./Router/authenticateRouter");
app.use("/api/authenticate", authenticateRouter); // base url, router-to-use