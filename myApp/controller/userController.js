const userModel = require("../Models/userModel");

module.exports.getUser = async function getUser(req, res) {
  try {
    const id = req.id;
    const user = await userModel.findById(id);
    let userProfile = {
      username: user.username,
      "number of followers": user.followers.length,
      "number of followings": user.following.length,
    };
    return res.status(200).send(userProfile);
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.follow = async function follow(req, res) {
  try {
    const user1 = await userModel.findById(req.id); // who is going to follow
    const user2 = await userModel.findById(req.params.id); // who is going to be followed

    if (!user2)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user1.id == user2.id)
      return res
        .status(400)
        .json({ success: false, message: "can't follow youself" });

    if (user1.following.includes(user2.id))
      return res
        .status(200)
        .json({ success: true });

    user1.following.push(user2._id);
    user2.followers.push(user1._id);

    await user1.save();
    await user2.save();

    return res.status(200).json({ success: true });
  } catch (error) { 
    res.status(501).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.unfollow = async function unfollow(req, res) {
  try {
    const user1 = await userModel.findById(req.id); // who is going to follow
    const user2 = await userModel.findById(req.params.id); // who is going to be followed

    if (!user2)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user1.id == user2.id)
      return res
        .status(400)
        .json({ success: false, message: "can't unfollow youself" });

    if (!user1.following.includes(user2.id))
      return res
        .status(200)
        .json({ success: false, message: "user is not in the following list" });

    user1.following.remove(user2._id);
    user2.followers.remove(user1._id);

    await user1.save();
    await user2.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error.message,
    });
  }
};
