const serverStore = require('../serverStore');

const roomLeave = require('../socketHandler/roomLeaveHandler');

const disconnectHandler = (socket) => {
  const activeRooms = serverStore.getActiveRooms();

  activeRooms.forEach((activeRoom) => {
    const checkUserHasInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );

    if (checkUserHasInRoom) {
      roomLeave.roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });
  serverStore.removeConectedUser(socket.id);
};

module.exports = disconnectHandler;
