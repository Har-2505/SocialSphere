import Navbar from "../components/Navbar";
import "./Feed.css";
import { useEffect, useState } from "react";
import api from "../services/api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [comments, setComments] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");

  // FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // CREATE POST
  const createPost = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/posts",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // LIKE POST
  const likePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // COMMENT POST
  const commentPost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/posts/${postId}/comment`,
        {
          text: comments[postId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments({
        ...comments,
        [postId]: "",
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE POST
  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // EDIT POST
  const editPost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/posts/${postId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingPostId(null);
      setEditText("");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="feed-container">
        <h1 className="feed-title">
          SocialSphere Feed 🚀
        </h1>

        <input
          className="post-input"
          type="text"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="post-btn"
          onClick={createPost}
        >
          Post
        </button>

        <hr />

        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
          >
            <h3>{post.userId.username}</h3>

            {editingPostId === post._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button
                  className="post-btn"
                  onClick={() => editPost(post._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <p>{post.text}</p>
            )}

            <p>❤️ {post.likes.length} Likes</p>

            <button
              className="like-btn"
              onClick={() => likePost(post._id)}
            >
              Like
            </button>

            <button
              className="delete-btn"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>

            <button
              className="edit-btn"
              onClick={() => {
                setEditingPostId(post._id);
                setEditText(post.text);
              }}
            >
              Edit
            </button>

            <p>💬 {post.comments.length} Comments</p>

            <input
              className="comment-input"
              type="text"
              placeholder="Write a comment..."
              value={comments[post._id] || ""}
              onChange={(e) =>
                setComments({
                  ...comments,
                  [post._id]: e.target.value,
                })
              }
            />

            <button
              className="comment-btn"
              onClick={() => commentPost(post._id)}
            >
              Comment
            </button>

            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="comment"
              >
                💬 {comment.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Feed;