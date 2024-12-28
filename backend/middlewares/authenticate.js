const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        res.clearCookie('token');
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
