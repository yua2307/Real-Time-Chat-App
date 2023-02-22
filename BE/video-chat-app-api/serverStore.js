const { v4: uuidv4 } = require('uuid');

const connectedUsers = new Map();
let activeRooms = [];

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
};

const removeConectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

const getConnectedUsers = () => {
  return connectedUsers;
};

// rooms handler

const addNewActiveRoom = (userId, socketId, isPrivate) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    isPrivate: isPrivate,
    roomId: uuidv4(),
  };
  activeRooms = [...activeRooms, newActiveRoom];

  return newActiveRoom;
};

const getActiveRooms = () => {
  return activeRooms;
};

const getActiveRoomByRoomId = (roomId) => {
  return activeRooms.find((activeRoom) => activeRoom.roomId === roomId);
};

const joinActiveRoom = (roomId, newParticipants) => {
  const indexRoomExist = activeRooms.findIndex(
    (activeRoom) => activeRoom.roomId === roomId
  );
  if (indexRoomExist !== -1) {
    activeRooms[indexRoomExist].participants.push(newParticipants);
  }
};

const leaveActiveRoom = (roomId, leaveParticipant) => {
  const activeRoom = getActiveRoomByRoomId(roomId);

  if (activeRoom) {
    const cloneActiveRoom = { ...activeRoom };
    cloneActiveRoom.participants = cloneActiveRoom.participants.filter(
      (participant) => participant.socketId !== leaveParticipant.socketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (cloneActiveRoom.participants.length > 0) {
      activeRooms.push(cloneActiveRoom);
    }
  }
};

const leaveActiveRoomPrivate = (roomId) => {
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
};

const informParticipantsLeft = (activeRooms, socket) => {
  if (activeRooms) {
    activeRooms.participants.forEach((participant) => {
      socket.to(participant.socketId).emit('room-has-user-left', {
        socketIdUserLeaveRoom: socket.id,
      });
    });
  }
};

module.exports = {
  addNewConnectedUser,
  removeConectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoomByRoomId,
  joinActiveRoom,
  leaveActiveRoom,
  getConnectedUsers,
  informParticipantsLeft,
  leaveActiveRoomPrivate,
};
