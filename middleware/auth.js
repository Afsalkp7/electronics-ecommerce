const jwt = require('jsonwebtoken');

const blacklist = [];

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (blacklist.includes(token)) {
    return res.status(401).json({ error: 'Token revoked (user logged out)' });
  }

  jwt.verify(token, process.env.authSecretKey , (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    next();
  });
};

const logout = (req, res) => {
  const token = req.headers.authorization;

  if (token && !blacklist.includes(token)) {
    blacklist.push(token);
    res.json({ message: 'Logout successful' });
  } else {
    res.status(401).json({ error: 'Invalid or revoked token' });
  }
};

module.exports = { requireAuth, logout };