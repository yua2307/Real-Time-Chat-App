const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    token = token.replace(/^Bearer\s+/, '');
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Unauthorized' + err);
  }
  return next();
};

module.exports = verifyToken;
