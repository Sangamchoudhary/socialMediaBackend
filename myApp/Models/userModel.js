const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const db_link =
  "mongodb+srv://admin:sangam9069@cluster0.0p8zc6s.mongodb.net/?retryWrites=true&w=majority";

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
  password: { type: String, required: true, minLength: 8 },
  noOfFollower:{},
  noOfFollowing:{},
  posts:{}
});

// model
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
