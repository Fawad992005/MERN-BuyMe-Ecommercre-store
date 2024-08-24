const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  // Clear the token cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: true, // Same as your login setup
    sameSite: 'None', // For cross-site cookie handling
    path: '/', // Clear cookie across all paths
  });

  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
