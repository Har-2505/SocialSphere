const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);

  res.status(200).json({
    imageUrl: req.file.path,
  });
});

module.exports = router;