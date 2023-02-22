const serverStore = require('../serverStore');
const roomUpdates = require('../socketHandler/updates/room');

const createRoomHandler = (socket) => {
  const socketId = socket.id;
  const userId = socket.user.userId;
  const roomDetails = serverStore.addNewActiveRoom(userId, socketId, false);
  socket.emit('create-room', { roomDetails });
  roomUpdates.updateRooms(userId, socketId);
};

const createRoomPrivateHandler = (socket, specificSocketId) => {
  const socketId = socket.id;
  const userId = socket.user.userId;
  const roomDetails = serverStore.addNewActiveRoom(userId, socketId, true);
  roomUpdates.createRoomPrivateSocket(specificSocketId, roomDetails, socketId);
};

module.exports = { createRoomHandler, createRoomPrivateHandler };
