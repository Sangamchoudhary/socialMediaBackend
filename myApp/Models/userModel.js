const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const dotenv = require("dotenv");
const db_link = process.env.DB_URI;

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("User Model DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: { type: String, required: true, minLength: 6 },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("userModel", userSchema);
