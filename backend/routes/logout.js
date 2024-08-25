// routes/logout.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token",{path:"/"});
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
