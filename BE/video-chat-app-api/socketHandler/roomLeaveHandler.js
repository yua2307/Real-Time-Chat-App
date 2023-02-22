const serverStore = require('../serverStore');
const roomUpdate = require('../socketHandler/updates/room');

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const userId = socket.user.userId;

  const participant = {
    userId: userId,
    socketId: socket.id,
  };

  serverStore.leaveActiveRoom(roomId, participant);

  const updatedActiveRoom = serverStore.getActiveRoomByRoomId(roomId);
  if (updatedActiveRoom) {
    serverStore.informParticipantsLeft(updatedActiveRoom, socket);
  }

  roomUpdate.updateRooms(userId, [], socket.id);
};

const roomLeaveHandlerPrivate = (socket, data) => {
  try {
    const { roomId } = data;
    const userId = socket.user.userId;
    const participant = {
      userId: userId,
      socketId: socket.id,
    };

    serverStore.leaveActiveRoom(roomId, participant);

    const updatedActiveRoom = serverStore.getActiveRoomByRoomId(roomId);

    if (updatedActiveRoom) {
      serverStore.informParticipantsLeft(updatedActiveRoom, socket);
    }

    roomUpdate.updateRooms(userId, [], socket.id);

    //TODO: investigate later
    // const beforeUpdateRoom = serverStore.getActiveRoomByRoomId(roomId);

    // const roomCreatorSocketId = beforeUpdateRoom.roomCreator.socketId;
    // const otherFriendSocketId =
    //   beforeUpdateRoom.roomCreator.socketId ===
    //   beforeUpdateRoom?.participants[0]?.socketId
    //     ? beforeUpdateRoom?.participants[1]?.socketId
    //     : beforeUpdateRoom?.participants[0]?.socketId;

    // serverStore.leaveActiveRoomPrivate(roomId);

    // roomUpdate.updateRoomPrivateSocket(
    //   roomCreatorSocketId,
    //   otherFriendSocketId
    // );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { roomLeaveHandler, roomLeaveHandlerPrivate };
