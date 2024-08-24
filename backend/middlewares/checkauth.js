// middlewares/checkAuth.js
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {

    const token = req.cookies['token'];
  
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }
  
    jwt.verify(token, process.env.SUPER_KEY, (err, user) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
  
  
      req.user = user;
      next();
    });
  };
  
  module.exports = checkAuth;
  