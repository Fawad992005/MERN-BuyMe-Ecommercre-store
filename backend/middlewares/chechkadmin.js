// middleware/checkAdmin.js
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token,process.env.SUPER_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    // Check if the user has an admin role
    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  });
};

module.exports = checkAdmin;
