const Post = require("../models/Post");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.create({
      userId: req.user.id,
      text,
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LIKE POST
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// COMMENT POST
const commentPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      userId: req.user.id,
      text,
    });

    await post.save();

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  commentPost,
};