const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:sangam9069@cluster0.0p8zc6s.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Post Model DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const postSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Title: String,
  Description: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// postSchema.pre(/^findById/, function (next) {
//   this.populate({
//     path: "post",
//     select: "_id",
//   }).populate("post");
//   next();
// });

module.exports = mongoose.model("Post", postSchema);
