const serverStore = require('../serverStore');
const roomUpdate = require('../socketHandler/updates/room');

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const userId = socket.user.userId;

  const participantDetails = {
    userId: userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoomByRoomId(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);

  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit('conn-prepare', {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  roomUpdate.updateRooms(userId, [], socket.id);
};

const roomJoinHandlerPrivate = (socket, data) => {
  const { roomId } = data;

  const userId = socket.user.userId;

  const participantDetails = {
    userId: userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoomByRoomId(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);

  // send information to others users in room that there is people to join, they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit('conn-prepare', {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  roomUpdate.updateRoomPrivateSocket(
    roomDetails.participants[0].socketId,
    socket.id
  );
};

module.exports = { roomJoinHandler, roomJoinHandlerPrivate };
