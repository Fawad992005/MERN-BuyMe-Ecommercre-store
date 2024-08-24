// routes/logout.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logged out successfully" });
});

module.exports = router;
