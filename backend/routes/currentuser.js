const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    // Send user data and a message in the same response
    return res.status(200).json({
      message: "User found",
      user: req.user
    });
  } else {
    // Send error response if user is not authenticated
    return res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
