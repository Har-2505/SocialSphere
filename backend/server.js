const express = require("express");

const app = express();

// Route
app.get("/", (req, res) => {
  res.send("SocialSphere Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});