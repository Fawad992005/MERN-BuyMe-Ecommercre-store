const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.json(req.user);
    res.status(200).json({message:"User found"})
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
