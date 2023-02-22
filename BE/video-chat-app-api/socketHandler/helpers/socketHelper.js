const serverStore = require('../../serverStore');

const sendDataViaSocketId = (data, socketId, eventname) => {
  const io = serverStore.getSocketServerInstance();
  io.to(socketId).emit(eventname, data);
};

module.exports = { sendDataViaSocketId };
