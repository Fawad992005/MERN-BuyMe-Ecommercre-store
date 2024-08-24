// middlewares/checkAuth.js
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SUPER_KEY);
    req.user = decoded; // Attach decoded user info to req object
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

  
  module.exports = checkAuth;
  
