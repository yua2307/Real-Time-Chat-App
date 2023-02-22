const serverStore = require('../../serverStore');
const friendService = require('../../services/friends/friendsService');

const updateRooms = async (
  userId,
  socketIdCreatorRoom,
  toSpecifiedSocketId
) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  const listFriendSocketIds = await friendService.getFriendListSocketId(userId);

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('active-rooms', {
      activeRooms,
    });
  }

  if (listFriendSocketIds.length > 0) {
    listFriendSocketIds.forEach((socketId) =>
      io.to(socketId).emit('active-rooms', {
        activeRooms,
      })
    );
  }

  if (socketIdCreatorRoom) {
    io.to(socketIdCreatorRoom).emit('active-rooms', {
      activeRooms,
    });
  }
};

const updateRoomPrivateSocket = async (toSpecifiedSocketId, socketSenderId) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('active-rooms', {
      activeRooms,
    });
  }

  if (socketSenderId) {
    io.to(socketSenderId).emit('active-rooms', {
      activeRooms,
    });
  }
};

const createRoomPrivateSocket = async (
  toSpecifiedSocketId,
  roomDetails,
  socketSenderId
) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('create-room', { roomDetails });

    io.to(toSpecifiedSocketId).emit('active-rooms', {
      activeRooms,
    });
  }

  if (socketSenderId) {
    io.to(socketSenderId).emit('create-room', {
      roomDetails,
    });
    io.to(socketSenderId).emit('active-rooms', {
      activeRooms,
    });
  }
};

module.exports = {
  updateRooms,
  updateRoomPrivateSocket,
  createRoomPrivateSocket,
};
