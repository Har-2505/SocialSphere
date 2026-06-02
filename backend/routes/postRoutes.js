const express = require("express");

const {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost,
  editPost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);

router.get("/", getPosts);
router.put("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentPost);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, editPost);
module.exports = router;