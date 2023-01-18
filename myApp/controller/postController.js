const Post = require("../Models/postModel");
const User = require("../Models/userModel");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      owner: req.id,
      Title: req.body.Title,
      Description: req.body.Description,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.id);

    user.posts.unshift(post.id);
    await user.save();

    res.status(201).json({
      "Post-ID": post._id,
      Title: post.Title,
      Description: post.Description,
      "Created Time(UTC)": post.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.owner.toString() !== req.id.toString()) {
      return res.status(401).json({
        success: false,
        message: "trying to delete a unauthorize post",
      });
    }

    await post.remove();

    const user = await User.findById(req.id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      id: post._id,
      "number of likes": post.likes.length,
      "number of comments": post.comments.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.id });

    let ans = [];

    posts.forEach((element, index, array) => {
      ans.push({
        id: element._id,
        title: element.Title,
        desc: element.Description,
        created_at: element.createdAt,
        comments: element.comments,
        likes: element.likes.length,
      });
    });

    res.status(200).send(ans);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.id))
      return res.json({ success: false,  message: "post is already liked" });

    post.likes.push(req.id);

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!post.likes.includes(req.id))
      return res.json({
        success: false,
        message: "to unlike the post, first like it",
      });

    const index = post.likes.indexOf(req._id);

    post.likes.splice(index, 1);

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req._id,
      comment: req.body.comment,
    });

    await post.save();

    return res.status(201).json({
      "Comment-Id": post.comments[post.comments.length - 1]._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
