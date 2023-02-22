const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyJwtTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    socket.user = decoded;
  } catch (err) {
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }
  next();
};

module.exports = verifyJwtTokenSocket;
