const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwt_key = "7f89sa7f89";

module.exports.protectRoute = async function protectRoute(req, res, next) {
  let token = req.cookies.login;
  if (!token) res.json({ message: "Please Login" });
  let payload = jwt.verify(token, jwt_key);
  if (!payload)
    return res.json({ message: "Login unsuccessful due to wrong token" });
  const user = await userModel.findById(payload.payload);
  req.id = user.id;
  next();
};

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });
    if (!user) return res.json({ message: "User Not Found" });
    if (user.password != data.password) res.send("Wrong Credentials");
    let uid = user["_id"];
    let token = jwt.sign({ payload: uid }, jwt_key);
    res.cookie("login", token, { httpOnly: true });
    res.json({ JWT_token: token });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
