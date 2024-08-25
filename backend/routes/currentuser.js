const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error handling request:', error);

    // Send a generic server error response
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
