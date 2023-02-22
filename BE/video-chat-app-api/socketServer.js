const { Server } = require('socket.io');
const serverStore = require('./serverStore');
const friendUpdate = require('./socketHandler/updates/friends');
const authSocket = require('./middleware/authSocket');
const handleNewConnection = require('./socketHandler/newConnectionHandler');
const disconnectHandler = require('./socketHandler/disconnectHandler');
const roomInitConnectionHandler = require('./socketHandler/roomInitConnectionHandler');
const roomSignalHandler = require('./socketHandler/roomSignalHandler');
const directMessageHandler = require('./socketHandler/directMessageHandler');
const directChatHistoryHandler = require('./socketHandler/directChatHistoryHandler');
const roomJoin = require('./socketHandler/roomJoinHander');
const roomCreate = require('./socketHandler/roomCreateHandler');
const roomLeave = require('./socketHandler/roomLeaveHandler');

const TIME_TO_GET_ONLINE_USERS = 3000;

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      method: ['GET', 'POST'],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on('connection', (socket) => {
    handleNewConnection(socket);
    friendUpdate.updateOnlineUsers();

    socket.on('direct-message', (data) => {
      directMessageHandler(socket, data);
    });

    socket.on('direct-chat-history', (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on('create-room', (socketFriendId) => {
      if (socketFriendId) {
        roomCreate.createRoomPrivateHandler(socket, socketFriendId);
        return;
      }
      roomCreate.createRoomHandler(socket);
    });

    socket.on('join-room', (data) => {
      const roomFind = serverStore.getActiveRoomByRoomId(data.roomId);
      if (roomFind?.isPrivate) {
        roomJoin.roomJoinHandlerPrivate(socket, data);
        return;
      }
      roomJoin.roomJoinHandler(socket, data);
    });

    socket.on('leave-room', (data) => {
      const roomFind = serverStore.getActiveRoomByRoomId(data.roomId);
      if (roomFind?.isPrivate) {
        roomLeave.roomLeaveHandlerPrivate(socket, data);
        return;
      }
      roomLeave.roomLeaveHandler(socket, data);
    });

    socket.on('conn-init', (data) => {
      roomInitConnectionHandler(socket, data);
    });

    socket.on('conn-signal', (data) => {
      roomSignalHandler(socket, data);
    });

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    friendUpdate.updateOnlineUsers();
  }, [TIME_TO_GET_ONLINE_USERS]);
};

module.exports = { registerSocketServer };
